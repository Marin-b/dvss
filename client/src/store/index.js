import { combineReducers } from "redux";
import { createStore } from 'redux'

import socketEvents from "./initSocketEvent"
import userReducer from "./user"
import socketReducer from "./socket"
import timerReducer from "./timer"
import roundReducer from "./round"


const reducers = combineReducers({
  userReducer,
  socketReducer,
  timerReducer,
  roundReducer
})

const store = createStore(reducers)
socketEvents(store.dispatch, store.getState)

export default store
