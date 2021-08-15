import { combineReducers } from "redux";
import { playersReducer } from "./playersReducer";
import { HYDRATE } from "next-redux-wrapper";
import { matchsReducer } from "./matchsReducer";
import { herosReducer } from "./herosReducer";

export const reducers = combineReducers({
    players: playersReducer,
    matchs: matchsReducer,
    heros:  herosReducer
})

export const reducer = (state, action) => {
    if(action.type === HYDRATE) {
        const nextState = {
          ...state, // use previous state
          ...action.payload, // apply delta from hydration
        }
        return nextState
    }else{
        return reducers(state, action)
    }
}