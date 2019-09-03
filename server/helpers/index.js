import bcrypt from "bcrypt"
import fetch from "node-fetch"
import { User, Bet, Withdraw } from "../schemas"
import store from "store"

export const findUser = async (givenKey) => {
  const [name, key] = givenKey.split('-')
  const users = await User.find({userName: name})
  for(const user of users){
    const isEqual = await bcrypt.compare(key, user.key)
    if(isEqual){
      return user
    }
  }
  return null
}

export const emitRoundInformation = async (io) => {
  io.emit("roundInformation", store.get('currentValue'), store.get("previousRounds"))
}

export const settleBet = (bet, socket) => {
  let didWin = "lost";
  bet.endValue = store.get("currentValue");
  switch (bet.direction){
    case "up":
      if (bet.endValue > bet.startValue)
      {
        updateBalance(socket, bet.gambler._id, bet.amount * 1.97);
        didWin = "won";
      }
      break;
    case "down":
      if (bet.endValue < bet.startValue)
        {
          updateBalance(socket, bet.gambler._id, bet.amount * 1.97);
          didWin = "won";
        }
        break;
    case "equal":
      if (bet.endValue == bet.startValue)
      {
        updateBalance(socket, bet.gambler._id, bet.amount * 1.97);
        didWin = "won";
      }
      break;
  }
  socket.emit("betSettled", didWin, bet.endValue)
  console.log("emited settle")
  bet.save();
}

export const updateBalance = async (io, id, amount) => {
  console.log(amount, ",   userid:", id)
  const user = await User.findById(id)
  const balance = user.balance
  user.balance = balance + amount

  await user.save()
  io.emit(`updateBalance-${id}`, user.balance )
}

const setRoundDirection = async (round, io) => {
  round.value = await getCurrentBTCValue().catch(err => console.log(err))
  const oldValue = store.get('currentValue')
  const newValue = round.value
  shiftRounds(newValue)
 if ( newValue > oldValue ){
    round.direction = "up"
  } else if ( newValue < oldValue ){
    round.direction = "down"
  }else if ( oldValue === newValue ) {
    round.direction = "equal"
  }
  return round.save().then( () => settleBets(round, io))
}

export const getUserFromWithdrawId = async(withdrawId) => {
  const withdrawalRecord =  await Withdraw.find({withdrawalId: withdrawId})
  return withdrawalRecord[0].userId
}

export const getCurrentBTCValue = async () => {
  try {
    const response = await fetch(
      "https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD"
    );
    const body = await response.json();
    const newValue = await body["last"];
    return newValue.toFixed(2)
  } catch(err){
    return await getCurrentBTCValue()
  }
}
