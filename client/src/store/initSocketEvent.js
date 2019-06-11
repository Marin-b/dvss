import { userSocketEvents } from "./user"
import { timerSocketEvents } from "./timer"
import { roundSocketEvents } from "./round"
import { betSocketEvents } from "./bet"

export default (dispatch, getState) => {
  const socket = getState().socketReducer.socket
  userSocketEvents(dispatch, socket)
  timerSocketEvents(dispatch, socket)
  roundSocketEvents(dispatch, socket)
  betSocketEvents(dispatch, socket)
  socket.emit("getRoundInformation")
}
