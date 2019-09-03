import { combineReducers } from "redux";
import { createStore } from 'redux'

import socketEvents from "./initSocketEvent"
import userReducer from "./user"
import socketReducer from "./socket"
import valueReducer from "./value"
import betReducer from "./bet"


const reducers = combineReducers({
  userReducer,
  socketReducer,
  valueReducer,
  betReducer
})

const store = createStore(reducers)
socketEvents(store.dispatch, store.getState)

export default store
