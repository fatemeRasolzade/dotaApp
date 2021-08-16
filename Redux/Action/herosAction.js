import axios from "axios"
import * as t from '../type'

export const getHeros = () => async dispatch => {
    await axios.get('https://api.opendota.com/api/heroes')
    .then(res => {
        dispatch({type: t.GET_HEROS, payload: res.data})
    })
    .catch(err => {
        alert(err)
    })
}