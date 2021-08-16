import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import { getProplayer } from '../../Redux/Action/playersAction'
import LoadingSpinners from '../../components/Utils/LoadingSpinners'

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
                    {loading ? <LoadingSpinners/> : null}
                    {proplayers.map(pl => (
                        <Link href={`/proplayer/playerInfo/${pl.account_id}`}>
                            <li className="player-list">
                                <div className="px-3"><img style={{width: '50px', borderRadius:'50px'}} src={pl.avatarfull}/></div>
                                <div><p>{pl.name}</p></div>
                            </li>
                        </Link>
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
