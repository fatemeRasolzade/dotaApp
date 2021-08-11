import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from 'redux-thunk'
import { reducer } from "./Reducer";

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
      const { composeWithDevTools } = require('redux-devtools-extension')
      return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
  }

const state={}

const initStore = () => {
    return createStore(reducer, bindMiddleware([thunkMiddleware]))
  }

export const wrapper = createWrapper(initStore)