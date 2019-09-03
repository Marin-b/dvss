const initialState = {
  placedBet: false,
  amount: undefined,
  startValue: undefined,
  betResult: undefined,
  endValue: undefined,
  direction: undefined,
  scene: false
}

const getReducer = (state) => state.betReducer

export const isBetPlaced = (state) => getReducer(state).placedBet

export const getBetObject = (state) => ({amount: getReducer(state).amount, direction: getReducer(state).direction })

export const getBetAmount = (state) => getReducer(state).amount

export const getStartValue = (state) => getReducer(state).startValue

export const getBetDirection = (state) => getReducer(state).direction

export const getBetResult = (state) => getReducer(state).betResult

export const shouldDisplayScene = (state) => getReducer(state).scene

const UPDATE_START_VALUE = "bet/update-start-value"
const UPDATE_END_VALUE = "bet/update-end-value"
const UPDATE_BET = "bet/update-bet"
const UPDATE_RESULT = "bet/update-result"
const REMOVE_BET = "bet/remove-bet"
const REMOVE_SCENE = "bet/remove-scene"

const updateBet = (amount, direction) => ({type: UPDATE_BET, payload: {amount: amount, direction: direction}})

const updateStartValue = (sv) => ({type: UPDATE_START_VALUE, payload: sv})

const updateEndValue = (ev) => ({type: UPDATE_END_VALUE, payload: ev})

const updateBetResult = (result) => ({type: UPDATE_RESULT, payload: result})

const removeBet = () => ({type: REMOVE_BET})

const removeScene = () => ({type: REMOVE_SCENE})

export const betSocketEvents = (dispatch, socket) => {
  socket.on("betPlaced", (amount, direction, startValue) => {
    dispatch(updateBet(amount, direction));
    dispatch(updateStartValue(startValue));
  });

  socket.on("betSettled", (result, endValue) =>{
    console.log("removing bets info");
    dispatch(updateEndValue(endValue));
    dispatch(updateBetResult(result));
    console.log(result);
    dispatch(removeBet());
    setTimeout( () => dispatch(removeScene()) , 5000 )
  })
}

const betReducer = (state = initialState, action ) => {
  const {type, payload} = action;
  switch (type){
  case UPDATE_BET:
    return Object.assign({}, state, {
      amount: payload.amount,
      direction: payload.direction,
      placedBet: true,
      scene: true
    });
  case REMOVE_BET:
    return Object.assign({}, state, {
      placedBet: false
    });
  case REMOVE_SCENE:
    return Object.assign({}, state, {
      amount: undefined,
      direction: undefined,
      scene: false,
      betResult: false
    });
  case UPDATE_START_VALUE:
    return Object.assign({}, state, {
      startValue: payload
    });
   case UPDATE_END_VALUE:
    return Object.assign({}, state, {
      endValue: payload
    });
   case UPDATE_RESULT:
    return Object.assign({}, state, {
      betResult: payload
    });
  default:
    return state
  }
}

export default betReducer
