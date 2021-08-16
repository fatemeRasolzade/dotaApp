import React from 'react'
import { useRouter } from 'next/dist/client/router'
import LoadingSpinners from '../../../components/Utils/LoadingSpinners'

export async function getStaticProps({params}) {
    const team = await fetch(`https://api.opendota.com/api/teams/${params.teamId}`)
    const teamInfo = await team.json()
    const players = await fetch(`https://api.opendota.com/api/teams/${params.teamId}/players`)
    const teamPlayers = await players.json()
    const heros = await fetch(`https://api.opendota.com/api/teams/${params.teamId}/heroes`)
    const teamHeros = await heros.json()
  
    if (teamInfo || teamPlayers || teamHeros) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
    return {
        props:{ 
                teamInfo: teamInfo,
                teamPlayers: teamPlayers,
                teamHeros: teamHeros
            }, 
        revalidate:10
    }
    
  }

  export async function getStaticPaths() {
    const posts = [
        {
            teamId: 15
        },
        {
            teamId: 8204512
        },
        {
            teamId: 5228654
        },
        {
            teamId: 5026801
        },
        {
            teamId: 1883502
        },
    ]
        
    const paths = posts.map((post) => ({
      params: { teamId: post.teamId.toString() },
    }))
    return { paths, fallback: true }
  }

const TeamDetails = ({teamInfo, teamPlayers, teamHeros}) => {

    const router = useRouter();

    const OnClickPlayer = (id) => {
        router.push(`/proplayer/playerInfo/${id}`)
    }

    if (router.isFallback) {
        return <LoadingSpinners/>
    }

    console.log(teamHeros);

    return (
        <div>
            <img className="index-bg" src="/img/teamsBg.jpg"/>
            <div className='container'>
                <div className="row pt-5">
                    <div className="col-6">
                        <div className="d-flex pt-5">
                            <div>
                                <img style={{borderRadius: '100px'}} src={teamInfo.logo_url}/>
                            </div>
                            <div className='d-flex flex-column justify-content-center px-4'>
                                 <p className='fs-1'>{teamInfo.name}</p>
                                <p className='fs-3'>{teamInfo.tag}</p>
                            </div>
                        </div>
                        <div className="pt-4">
                            <p className='pt-1 fs-5'>rating: {teamInfo.rating}</p>
                            <p className='pt-1 fs-5'>wins: {teamInfo.wins}</p>
                            <p className='pt-1 fs-5'>losses: {teamInfo.losses}</p>
                            <p className='pt-1 fs-5'>last match time: {teamInfo.last_match_time}</p>
                        </div>
                    </div>
                    <div className="col-3">
                        <p className='pt-1 fs-4' >team player</p>
                        <div>
                            {teamPlayers.map(p => (
                                <div key={p.account_id} className="prosplayer-list"
                                    onClick={() => OnClickPlayer(p.account_id)}
                                >
                                    {/* <img style={{borderRadius: '50px', marginRight: '.6rem'}} src={pros.avatar}/> */}
                                    <p style={{fontSize: '1.2rem'}}>{p.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-3">
                        <p className='pt-1 fs-4' >team heros</p>
                        <div>
                            {teamHeros.map(h => (
                                <div key={h.hero_id} className="prosplayer-list"
                                    // onClick={() => OnClickPlayer(p.account_id)}
                                >
                                    {/* <img style={{borderRadius: '50px', marginRight: '.6rem'}} src={pros.avatar}/> */}
                                    <p style={{fontSize: '1.2rem'}}>{h.localized_name}</p>
                                </div>
                            ))}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamDetails
