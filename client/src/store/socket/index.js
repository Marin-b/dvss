import socketIOClient from "socket.io-client";

const socketInstance = socketIOClient("http://localhost:3001")

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
