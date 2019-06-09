import { Round, Bet } from "./schemas"
import { updateRounds } from "./helpers"

const newRound = () => {
  const round = new Round({
    endTime: Date.now(),
    bets: [],
    value: undefined,
    direction: undefined
  })
  round.save()
  return round.id
}

const runCountDown = (timeLeft, io, roundId = null, previousRoundId =null) => {
  io.emit("timerUpdate", timeLeft)
  if(timeLeft === 0){
    updateRounds(roundId, previousRoundId, io)
    previousRoundId = roundId
    roundId = newRound()
    io.emit("newRound", roundId)
    timeLeft = 10
  } else {
    timeLeft -= 1
  }
  setTimeout(runCountDown, 1000, timeLeft, io, roundId, previousRoundId)
}

const initCountDown = async (io) => {
  const previousRoundId = await Round.findOne({}, {},  { sort: { '_id': -1 }})
  const roundId = newRound()
  runCountDown(10, io, roundId, previousRoundId._id)
}

export default initCountDown
