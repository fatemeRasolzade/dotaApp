import * as t from '../type'

const initialState = {
    proplayer: []
}

export const playersReducer = (state=initialState, action) => {
    switch (action.type) {
        case t.GET_PROPLAYER:
            return{
                ...state,
                proplayer: action.payload
            }
        default:
            return state;
    }
}