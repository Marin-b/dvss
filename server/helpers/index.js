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

export const emitRoundInformation = (io) => {
  io.emit("roundInformation", store.get('roundId'), store.get('C_BTC'), store.get('1_BTC'), store.get('2_BTC'))
}

const settleBets = (round, io) => {
  const bets = round.bets
  bets.forEach( async (betId) => {
    const bet = await Bet.findById(betId)
    const user = await User.findById(bet.gambler)
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

const getRoundDirection = (currentValue) => {
  const temp = store.get('C_BTC')
  if(!temp){
    return 'equal'
  }
  const oldValue = temp.v

  console.log('oldValue', oldValue, 'currentValue', currentValue)
  if(!oldValue) {
    return undefined
  }
  if ( oldValue === currentValue ) {
    return "equal"
  } else if ( currentValue > oldValue ){
    return "up"
  } else if ( currentValue < oldValue ){
    return "down"
  }
} 

const getCurrentBTCValue = async () => {
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

export const newRound = () => {
  const round = new Round({
    endTime: Date.now(),
    bets: [],
    value: undefined,
    direction: undefined
  })
  round.save()
  return round.id
}

const updateBTCValues = (value, direction) => {
  store.set('2_BTC', store.get('1_BTC'))
  store.set('1_BTC', store.get('C_BTC'))
  store.set('C_BTC', {v: value, d: direction})
  store.set('roundId', newRound())
}

export const endOfRound = async (io) => {
  console.log('roundId stored :', store.get('roundId'))
  const currentRound = await Round.findById(store.get('roundId')).catch(err => console.log(err))
  currentRound.value = await getCurrentBTCValue().catch(err => console.log(err))
  const direction = getRoundDirection(currentRound.value)
  console.log(direction)
  currentRound.direction = direction
  currentRound.save()
  settleBets(currentRound, io)
  updateBTCValues(currentRound.value, currentRound.direction)
  emitRoundInformation(io)
  store.set('placedBet', [])
}