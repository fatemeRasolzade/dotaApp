import * as t from '../type'

const initialState = {
    proplayer: [],
    playerInfo:{}
}

export const playersReducer = (state=initialState, action) => {
    switch (action.type) {
        case t.GET_PROPLAYER:
            return{
                ...state,
                proplayer: action.payload
            }
        case t.GET_PLAYER_INFO:
            return{
                ...state,
                playerInfo: action.payload
            }
        default:
            return state;
    }
}