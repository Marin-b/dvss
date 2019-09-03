const initialState = {
  value: 0
}

const getReducer = (state) => state.valueReducer

export const getValue = (state) => getReducer(state).value

const UPDATE_VALUE = "value/update-value"

const updateValue = (newValue) => ({type: UPDATE_VALUE, payload: newValue})

export const valueSocketEvents = (dispatch, socket) => {
  socket.on("valueUpdate", (newValue) => {
    dispatch(updateValue(newValue))
  })
}

const valueReducer = (state = initialState, action ) => {
  const {type, payload} = action;
  switch (type){
  case UPDATE_VALUE:
    return Object.assign({}, state, {
      value: payload
    });
  default:
    return state
  }
}

export default valueReducer
