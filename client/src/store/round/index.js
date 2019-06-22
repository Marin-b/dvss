import { removeBet } from "../bet"

const initialState = {
  roundId: undefined,
  BTC: {v: undefined, d: undefined},
  BTC_10: {v: undefined, d: undefined},
  BTC_20: {v: undefined, d: undefined}
}

const getReducer = (state) => state.roundReducer

export const getRoundId = (state) => getReducer(state).roundId

export const getResult = (state) => {
  const object = getReducer(state)
  const difference = Math.abs(object.BTC.v - object.BTC_10.v)
  const direction = object.BTC.d
  return ({diff: difference.toFixed(2), dir: direction})
}

export const getBitCoinPriceHistory = (state) => {
  const object = getReducer(state)
  return ({current: object.BTC, ten: object.BTC_10, twenty: object.BTC_20, next: {d: 'equal', v: '?'}})
}

const UPDATE_ROUNDID = "round/update-id"
const UPDATE_BTC = "round/update-btc"

const updateRoundId = (newId) => ({ type: UPDATE_ROUNDID, payload: newId})

const updateBtcValues = (BTC, BTC_10, BTC_20) => ({type: UPDATE_BTC, payload: {BTC: BTC, BTC_10: BTC_10, BTC_20: BTC_20 }})

export const roundSocketEvents = (dispatch, socket) => {
  socket.on('newRound', (roundId) => {
    dispatch(updateRoundId(roundId))
  })
  socket.on("roundInformation", (roundId, BTC, BTC_10, BTC_20) => {
    dispatch(updateRoundId(roundId))
    dispatch(updateBtcValues(BTC, BTC_10, BTC_20))
    removeBet(dispatch)
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
