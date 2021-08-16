import * as t from '../type'
import axios from 'axios'

export const getProplayer = () => async dispatch => {
    await axios.get('https://api.opendota.com/api/proPlayers')
    .then(res => {
        dispatch({type: t.GET_PROPLAYER, payload: res.data.slice(0,20)})
    })
    .catch(err => alert(err)) 
}

export const getplayerInfo = (id) => async dispatch => {
    await axios.get(`https://api.opendota.com/api/players/${id}`)
    .then(res => {
        dispatch({type: t.GET_PLAYER_INFO, payload: res.data.profile})
    })
    .catch(err => alert(err));
}