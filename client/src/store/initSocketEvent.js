import { userSocketEvents } from "./user"
import { timerSocketEvents } from "./timer"
import { roundSocketEvents } from "./round"

export default (dispatch, getState) => {
  userSocketEvents(dispatch, getState)
  timerSocketEvents(dispatch, getState)
  roundSocketEvents(dispatch, getState)
}
