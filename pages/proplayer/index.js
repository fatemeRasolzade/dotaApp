import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import LoadingSpinners from '../../components/Utils/LoadingSpinners'

export async function getServerSideProps() {
    const getProplayer = await fetch(`https://api.opendota.com/api/proPlayers`)
    const proPlayers = await getProplayer.json()
    if(! proPlayers){
        <LoadingSpinners/>
    }
    return { props: { proPlayers: proPlayers.slice(0,20) } }
  }

const proplayer = ({proPlayers}) => {

    return (
        <div>
            <img className="index-bg" src="/img/proplayerBg.jpg"/>
            <div className='container'>
                <h3 className="pt-5">Proplayers</h3>
                <ul className="py-3">
                    {proPlayers.map(pl => (
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

export default proplayer
