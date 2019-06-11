const initialState = {
  connected: false,
  userName: undefined,
  hashedKey: undefined,
  id: undefined,
  balance: 0,
  payreq: undefined
}

const getReducer = (state) => state.userReducer;

export const isUserConnected = (state) => getReducer(state).connected;

export const getBalance = (state) => getReducer(state).balance;

export const getUserName = (state) => getReducer(state).userName;

export const getPayreq = (state) => getReducer(state).payreq;

export const getUserId = (state) => getReducer(state).id

const USER_CONNECT = "user/connect"
const UPDATE_PAYREQ = "user/update-payreq"
const UPDATE_BALANCE = "user/update-balance"

const connectUser = (u, h, b, i, p) =>({type: USER_CONNECT, payload: { userName: u, hashedKey: h, balance: b, id: i, placedBet: p}});

export const updatePayreq = (newPayreq) => ({type: UPDATE_PAYREQ, payload: newPayreq});

export const updateBalance = (newBalance) => ({type: UPDATE_BALANCE, payload: newBalance})

export const userSocketEvents = (dispatch, socket) => {
  socket.on('userConnected', (userName, hashedKey, balance, id, placedBet) => {
    dispatch(connectUser(userName, hashedKey, balance, id, placedBet))
    socket.on(`updateBalance-${id}`, (newBalance) =>{
      dispatch(updateBalance(newBalance))
    })
  })
  socket.on("sendPayreq", (newPayreq) => {
    dispatch(updatePayreq(newPayreq))
  })
}

const userReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type){
  case USER_CONNECT:
    return Object.assign({}, state, {
      connected: true,
      userName: payload.userName,
      hashedKey: payload.hashKey,
      balance: payload.balance,
      id: payload.id
    });
  case UPDATE_PAYREQ:
    return Object.assign({}, state, {
      payreq: payload
    });
  case UPDATE_BALANCE:
    return Object.assign({}, state, {
      balance: payload
    });
  default:
    return state
  }
}

export default userReducer
