import axios from "axios"
import * as t from '../type'

export const getPromatch = () => async dispatch => {
    const response = await axios.get('https://api.opendota.com/api/proMatches')
    .then(res => {
        dispatch({type: t.GET_PROMATCH, payload: res.data.slice(0,20)})
    })
    .catch(err => {
        alert(err)
    })
}