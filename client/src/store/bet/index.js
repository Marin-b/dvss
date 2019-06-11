const initialState = {
  placedBet: false,
  amount: undefined,
  direction: undefined
}

const getReducer = (state) => state.betReducer

export const isBetPlaced = (state) => getReducer(state).placedBet

export const getBetObject = (state) => ({amount: getReducer(state).amount, direction: getReducer(state).direction })

const UPDATE_BET = "bet/update-bet"

const updateBet = (amount, direction) => ({type: UPDATE_BET, payload: {amount: amount, direction: direction}})

export const betSocketEvents = (dispatch, socket) => {
  socket.on("betPlaced", (amount, direction) => {
    dispatch(updateBet(amount, direction))
  })
}

const betReducer = (state = initialState, action ) => {
  const {type, payload} = action;
  switch (type){
  case UPDATE_BET:
    return Object.assign({}, state, {
      amount: payload.amount,
      direction: payload.direction,
      placedBet: true
    });
  default:
    return state
  }
}

export default betReducer
