import { userSocketEvents } from "./user"
import { valueSocketEvents } from "./value"
import { betSocketEvents } from "./bet"

export default (dispatch, getState) => {
  const socket = getState().socketReducer.socket
  userSocketEvents(dispatch, socket)
  valueSocketEvents(dispatch, socket)
  betSocketEvents(dispatch, socket)
  socket.emit("getRoundInformation")
}
