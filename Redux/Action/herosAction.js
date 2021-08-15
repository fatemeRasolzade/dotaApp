import axios from "axios"
import * as t from '../type'

export const getHeros = () => async dispatch => {
    const response = await axios.get('https://api.opendota.com/api/heroes')
    await dispatch({type: t.GET_HEROS, payload: response.data})
}