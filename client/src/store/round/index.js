import { removeBet } from "../bet"

const initialState = {
  value: 0,
  values: []
}

const getReducer = (state) => state.roundReducer

export const getRoundId = (state) => getReducer(state).roundId

export const getResult = (state) => {
  const values = getReducer(state).values
  if(values.length > 2) {
    const difference = values[0] - values[1]
    let direction
    if (difference < 0){
      direction = "down"
    } else if ( difference > 0) {
      direction = "up"
    } else {
      direction = "equal"
    }
    const absDifference = Math.abs(difference)
    return ({diff: absDifference.toFixed(2), dir: direction})
  } else {
    return ({diff: 0, dir: "unknown"})
  }
}

export const getCurrentBtc = (state) => getReducer(state).value

export const getBitCoinPriceHistory = (state) => getReducer(state).values

const UPDATE_VALUE = "round/update-value"
const UPDATE_VALUES = "round/update-values"

const updateValue = (newValue) => ({ type: UPDATE_VALUE, payload: newValue})

const updateValues = (values) => ({type: UPDATE_VALUES, payload: values})

export const roundSocketEvents = (dispatch, socket) => {
  socket.on("roundInformation", (value, values) => {
    dispatch(updateValues(values))
    dispatch(updateValue(value))
    removeBet(dispatch)
  })
}

const roundReducer = (state = initialState, action ) => {
  const {type, payload} = action;
  switch (type){
  case UPDATE_VALUE:
    return Object.assign({}, state, {
      value: payload
    });
  case UPDATE_VALUES:
    return Object.assign({}, state, {
      values: payload
    });
  default:
    return state
  }
}

export default roundReducer
