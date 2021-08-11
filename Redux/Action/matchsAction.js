import axios from "axios"
import * as t from '../type'

export const getPromatch = () => async dispatch => {
    const response = await axios.get('https://api.opendota.com/api/proMatches')
    await dispatch({type: t.GET_PROMATCH, payload: response.data.slice(0,20)})
}