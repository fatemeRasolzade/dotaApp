import axios from "axios"
import * as t from '../type'

export const getTeams = () => async dispatch => {
    await axios.get('https://api.opendota.com/api/teams')
    .then(res=>{
        dispatch({type: t.GET_TEAMS, payload: res.data.slice(0,20)})
    })
    .catch(err=>{
        alert(err)
    })
}