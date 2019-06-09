import bcrypt from "bcrypt"
import { User, Round, Bet } from "../schemas"
import fetch from "node-fetch"

export const findUser = async (givenKey) => {
  const [name, key] = givenKey.split('-')
  console.log(name, key)
  const users = await User.find({userName: name})
  for(const user of users){
    const isEqual = await bcrypt.compare(key, user.key)
    if(isEqual){
      return user
    }
  }
  return null
}

const checkBets = (round, io) => {
  const bets = round.bets
  bets.forEach( async (betId) => {
    const bet = await Bet.findById(betId)
    console.log(bet)
    const user = await User.findById(bet.gambler)
    user.placedBet = false
    user.save()
    console.log(user)
    let roundWon = false
    console.log("bet", bet.direction, "round", round.direction)
    if (bet.direction === round.direction){
      console.log("win!!!!")
      roundWon = true
      updateBalance(io, user._id, bet.amount * 1.97, true)
    }
    io.emit(`roundResult-${user.id}`, roundWon)
  })
}

export const updateBalance = async (io, id, amount) => {
  const user = await User.findById(id)
  const balance = user.balance
  user.balance = balance + amount
  console.log('afte balance update', user.balance)
  await user.save()
  io.emit(`updateBalance-${id}`, user.balance )
}

export const updateRounds = async (roundId, previousRoundId, io) => {
  const round = await Round.findById(roundId)
  const previousRound = await Round.findById(previousRoundId)
  const response = await fetch(
    "https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD"
  );
  const body = await response.json();
  const newValue = await body["last"];
  round.value = newValue
  const previousValue = previousRound.value
  if (newValue === previousValue){
    round.direction = "equal"
  } else if ( newValue > previousValue){
    round.direction = "up"
  } else if ( newValue < previousValue){
    round.direction = "down"
  }
  round.save()
  checkBets(round, io)
}
