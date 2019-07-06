import store from "store"

import { Round, Bet } from "./schemas"
import { endOfRound, newRound } from "./helpers"



const runCountDown = async (io) => {
  const timeLeft = store.get('timer')
  io.emit("timerUpdate", timeLeft)
  if(timeLeft === 0){
    endOfRound(io)
    store.set('timer', 5)
    runCountDown(io)
    return
  } else {
    store.set('timer', timeLeft - 1)
  }
  setTimeout(runCountDown, 1000, io)
}

export default runCountDown
