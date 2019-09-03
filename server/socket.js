import { User, Bet, Withdraw } from "./schemas";
import opennode from "./opennode";
import lightningPayReq from "bolt11";
import { findUser, settleBet } from "./helpers"
import store from "store"

const socketEvent = (socket) => {
  socket.on("createUser", (nickName, hashedKey) => {
    const newUser = new User({
      userName: nickName,
      key: hashedKey,
      balance: 0
    })
    newUser.save()
    .then(result => {
      console.log(result)
      socket.emit("userConnected", result.userName, result.key, result.balance, result._id)
    })
    .catch(err => console.log(err))
  })

  socket.on("userConnecting", async (givenKey) => {
    const user = await findUser(givenKey)
    if (user) {
      socket.emit("userConnected", user.userName, user.key, user.balance, user._id)
    } else {
       socket.emit('unableToConnect')
    }
  })

  socket.on("placeBet", async (amount, direction, userId) => {
    const user = await User.findById(userId)
    if (user.balance >= amount && !user.placedBet){
      const placedBet = store.get('placedBet')
      const bet = new Bet({
        startValue: store.get("currentValue"),
        direction: direction,
        amount: amount,
        gambler: user,
        endValue: 0
      });
      console.log(bet);
      bet.save()
      .then(result => {
        user.balance -= amount;
        user.placedBet = true;
        user.save()
        .then(result => {
          socket.emit("betPlaced", amount, direction, bet.startValue);
          socket.emit(`updateBalance-${userId}`, user.balance);
          setTimeout(settleBet, 10000, bet, socket);
        })
      })
      .catch(err => {
        socket.emit("betError")
      })
    } else {
      socket.emit("notEnougBalance")
    }
  })

  socket.on("newDeposit", (amount, userId) => {
    if(amount > 20000)
    {
      socket.emit("exceededDepositMaxAmount")
      return
    }
    opennode.createCharge({
      amount: amount,
      currency: "BTC",
      callback_url: process.env.DEPOSIT_CALLBACK,
      auto_settle: false,
      description: userId
    }).then(charge => {
      socket.emit("sendPayreq", charge.lightning_invoice.payreq)
    })
    .catch(error => {
      console.error(`${error.status} | ${error.message}`);
    });
  })

  socket.on("newWithdrawal", async (bolt11, userId) => {
    const user = await User.findById(userId)
    if (lightningPayReq.decode(bolt11).satoshis <= user.balance)
    {
      opennode.initiateWithdrawalAsync({
      type: 'ln',
      address: bolt11,
      description: userId,
      callback_url: process.env.WITHDRAW_CALLBACK
    }).then(withdrawal => {
      const newWithdraw = new Withdraw ({
        withdrawalId: withdrawal.id,
        userId: userId
      })
      newWithdraw.save()
      .catch(err => {
        console.log(err)
      })
    })
    .catch(error => {
      console.error(`${error.status} | ${error.message}`);
    });
    } else
    {
      console.log("not enough balance")
    }
  })
}

export default socketEvent
