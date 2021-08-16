import React, {useEffect, useState} from 'react'
import LoadingSpinners from '../../components/Utils/LoadingSpinners'

export async function getServerSideProps() {

    const getPromatch = await fetch(`https://api.opendota.com/api/proMatches`)
    const promatches = await getPromatch.json()
    
    if(!promatches){
        <LoadingSpinners/>
    }

    return { props: { promatches: promatches.slice(0,20) } }
  }

const promatch = ({promatches}) => {

    return (
        <div>
            <img className="index-bg" src="/img/promatchBg.jpg"/>
            <div className='container'>
                <h3 className="pt-5">Promatches</h3>
                <ul className="py-3">
                  
                    {promatches.map(mt => (
                        <li key={mt.match_id} className="player-list">
                            <div><p>{mt.league_name}</p></div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default promatch
