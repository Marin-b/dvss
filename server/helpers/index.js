import bcrypt from "bcrypt"
import fetch from "node-fetch"
import { User, Round, Bet } from "../schemas"
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

const settleBets = (round, io) => {
  const bets = round.bets
  bets.forEach( async (betId) => {
    const bet = await Bet.findById(betId)
    const user = await User.findById(bet.gambler)
    console.log(bet.direction, round.direction)
    if (bet.direction === round.direction){
      updateBalance(io,user._id, bet.amount * 1.97)
    }
  })
}

export const updateBalance = async (io, id, amount) => {
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

export const getCurrentBTCValue = async () => {
  try {
    const response = await fetch(
      "https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD"
    );
    const body = await response.json();
    const newValue = await body["last"];
    return newValue.toFixed(2)
  } catch(err){
    console.log(err)
    return getCurrentBTCValue()
  }
}

export const initFirstPlayingRound = async () => {
  const round = new Round({
    endTime: Date.now(),
    bets: [],
    value: undefined,
    direction: undefined,
    startValue: await getCurrentBTCValue(),
  })
  round.save()
  return round.id
}

export const newRound = () => {
  const round = new Round({
    endTime: Date.now(),
    bets: [],
    value: undefined,
    direction: undefined,
  })
  round.save()
  return round.id
}
const consolelogRound = async (id) => {
  const round = await Round.findById(id)
  console.log("consoleLogging", round)
}
const shiftRounds = async (newValue) => {
  // Cycling past rounds
  const previousRounds = store.get("previousRounds")
  previousRounds.unshift(newValue)
  if(previousRounds.length >= 8) { previousRounds.pop() }
  store.set("previousRounds", previousRounds)

  store.set('playingRound', store.get('bettingRound'))
  store.set('bettingRound', newRound())
  store.set('currentValue', newValue)
}

export const endOfRound = async (io) => {
  const currentRound = await Round.findById(store.get('playingRound')).catch(err => console.log(err))
  await setRoundDirection(currentRound, io)
  emitRoundInformation(io)
  return store.set('placedBet', [])
}
