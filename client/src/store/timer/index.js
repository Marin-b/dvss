const initialState = {
  timer: ""
}

const getReducer = (state) => state.timerReducer

export const getTimer = (state) => getReducer(state).timer

const UPDATE_TIMER = "timer/update-timer"

const updateTimer = (newTimer) => ({type: UPDATE_TIMER, payload: newTimer})

export const timerSocketEvents = (dispatch, socket) => {
  socket.on("timerUpdate", (newTimer) => {
    dispatch(updateTimer(newTimer))
  })
}

const timerReducer = (state = initialState, action ) => {
  const {type, payload} = action;
  switch (type){
  case UPDATE_TIMER:
    return Object.assign({}, state, {
      timer: payload
    });
  default:
    return state
  }
}

export default timerReducer
