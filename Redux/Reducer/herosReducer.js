import * as t from '../type'

const initialState = {
    heros: []
}

export const herosReducer = (state=initialState, action) => {
    switch (action.type) {
        case t.GET_HEROS:
            return{
                ...state,
                heros: action.payload
            }
            
    
        default:
            break;
    }
}