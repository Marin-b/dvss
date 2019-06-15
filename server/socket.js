import { User, Bet, Round } from "./schemas";
import opennode from "./opennode";
import { findUser, emitRoundInformation } from "./helpers"
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

  socket.on("placeBet", async (amount, direction, userId, roundId) => {
    const user = await User.findById(userId)
    const round = await Round.findById(roundId)
    if (user.balance >= amount && !user.placedBet){
      const placedBet = store.get('placedBet')
      if (placedBet.includes(userId)) {
        return
      } else {
        placedBet.push(userId)
        store.set('placedBet', placedBet)
      }
      const bet = new Bet({
        direction: direction,
        amount: amount,
        gambler: user
      })
      bet.save()
      .then(result => {
        round.bets.push(bet)
        round.save()
        .then(result => {
          user.balance -= amount
          user.placedBet = true
          user.save()
          .then(result => {
            socket.emit("betPlaced", amount, direction)
            socket.emit(`updateBalance-${userId}`, user.balance)
          })
        })
      })
      .catch(err => {
        socket.emit("betError")
      })
    } else {
      socket.emit("notEnougBalance")
    }
  })

  socket.on("getRoundInformation", async () => {
    emitRoundInformation(socket)
  })

  socket.on("newDeposit", (amount, userId) => {
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
}

export default socketEvent
