import * as t from '../type'

const initialState = {
    promatch: []
}

export const matchsReducer = (state=initialState, action) => {
    switch (action.type) {
        case t.GET_PROMATCH:
            return{
                ...state,
                promatch: action.payload
            }
        default:
            return state;
    }
}