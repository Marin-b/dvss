const initialState = {
  roundId: undefined,
  BTC: undefined,
  BTC_10: undefined,
  BTC_20: undefined,
}

const getReducer = (state) => state.roundReducer

export const getRoundId = (state) => getReducer(state).roundId

const UPDATE_ROUNDID = "round/update-id"
const UPDATE_BTC = "round/update-btc"

const updateRoundId = (newId) => ({ type: UPDATE_ROUNDID, payload: newId})

const updateBtcValues = (BTC, BTC_10, BTC_20) => ({type: UPDATE_BTC, payload: {BTC: BTC, BTC_10: BTC_10, BTC_20: BTC_20 }})

export const roundSocketEvents = (dispatch, socket) => {
  socket.on('newRound', (roundId) => {
    dispatch(updateRoundId(roundId))
  })
  socket.on("roundInformation", (roundId, BTC, BTC_10, BTC_20,) => {
    dispatch(updateRoundId(roundId))
    dispatch(updateBtcValues(BTC, BTC_10, BTC_20))
  })
}

const roundReducer = (state = initialState, action ) => {
  const {type, payload} = action;
  switch (type){
  case UPDATE_ROUNDID:
    return Object.assign({}, state, {
      roundId: payload
    });
  case UPDATE_BTC:
    return Object.assign({}, state, {
      ...payload
    });
  default:
    return state
  }
}

export default roundReducer
