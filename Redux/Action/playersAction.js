import * as t from '../type'
import axios from 'axios'

export const getProplayer = () => async dispatch => {
    const response = await axios.get('https://api.opendota.com/api/proPlayers')
    await dispatch({type: t.GET_PROPLAYER, payload: response.data.slice(0,20)})
}

export const getplayerInfo = (id) => async dispatch => {
    const response = await axios.get(`https://api.opendota.com/api/players/${id}`)
    await dispatch({type: t.GET_PLAYER_INFO, payload: response.data})
}