import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getProplayer } from '../../Redux/Action/playersAction'

const proplayer = ({proplayers, getProplayer}) => {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        initProplayer()
    }, [])

    const initProplayer = async() => {
        setLoading(true)
        await getProplayer()
        setLoading(false)
    }

    return (
        <div>
            <img className="index-bg" src="/img/proplayerBg.jpg"/>
            <div className='container'>
                <h3 className="pt-5">Proplayers</h3>
                <ul className="py-3">
                    {loading ?
                        <div className="py-5 d-flex justify-content-center" style={{width: '25rem'}}>
                            <div className="px-2">
                                <div className="spinner-grow" role="status">
                                    <span className="sr-only"></span>
                                </div>
                            </div>
                            <div className="px-2">
                                <div className="spinner-grow" role="status">
                                    <span className="sr-only"></span>
                                </div>
                            </div>
                            <div className="px-2">
                                <div className="spinner-grow" role="status">
                                    <span className="sr-only"></span>
                                </div>
                            </div>
                        </div>
                    : null}
                    {proplayers.map(pl => (
                        <li key={pl.account_id} className="player-list">
                            <div className="px-3"><img style={{width: '50px', borderRadius:'50px'}} src={pl.avatarfull}/></div>
                            <div><p>{pl.name}</p></div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    proplayers: state.players.proplayer
})

export default connect(mapStateToProps,{getProplayer})(proplayer)
