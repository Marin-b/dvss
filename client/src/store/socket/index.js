import socketIOClient from "socket.io-client";

const socketInstance = socketIOClient(process.env.SOCKET_CLIENT_URL)

const initialState = {
  socket: socketInstance,
}

const getReducer = (state) => state.socketReducer

export const getSocket = (state) => getReducer(state).socket

const socketReducer = (state = initialState, action ) => {
  const {type, payload} = action;
  switch (type){
  default:
    return state
  }
}

export default socketReducer
