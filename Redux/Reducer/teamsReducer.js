import * as t from '../type'

const initialState = {
    teams: []
}

export const teamsReducer = (state=initialState, action) => {
    switch (action.type) {
        case t.GET_TEAMS:
            return{
                ...state,
                teams: action.payload
            }
        default:
            return state;
    }
}