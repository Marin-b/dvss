const initialState = {
  roundId: undefined
}

const getReducer = (state) => state.roundReducer

export const getRoundId = (state) => getReducer(state).roundId

const UPDATE_ROUNDID = "round/update-id"

const updateRoundId = (newId) => ({ type: UPDATE_ROUNDID, payload: newId})

export const roundSocketEvents = (dispatch, getState) => {
  const socket = getState().socketReducer.socket
  socket.on('newRound', (roundId) => {
    dispatch(updateRoundId(roundId))
  })
}

const roundReducer = (state = initialState, action ) => {
  const {type, payload} = action;
  switch (type){
  case UPDATE_ROUNDID:
    return Object.assign({}, state, {
      roundId: payload
    });
  default:
    return state
  }
}

export default roundReducer
