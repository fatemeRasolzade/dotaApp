import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/dist/client/router'
import { connect } from 'react-redux';
import { getplayerInfo } from '../../../Redux/Action/playersAction';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import LoadingSpinners from '../../../components/Utils/LoadingSpinners';

export async function getStaticProps({ params }){
    const getProsPlayer = await fetch(`https://api.opendota.com/api/players/${params.playerId}/pros`)
    const prosPlayer = await getProsPlayer.json()
    if(!prosPlayer) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
    return {
        props: {
            prosPlayer: prosPlayer.slice(0,20),
        },
        revalidate:10
    }
}

export async function getStaticPaths() {
  
    const posts = [
        {
            playerId: 88470
        },
        {
            playerId: 639740
        },
        {
            playerId: 1296625
        },
        {
            playerId: 1400303
        },
        {
            playerId: 1470116
        },
    ]
    const paths = posts.map((post) => ({
      params: { playerId: post.playerId.toString() },
    }))
    return { paths, fallback: true }
}

const PlayerDetails = ({playerInfo, getplayerInfo, wlPlayer, prosPlayer}) => {

    const router = useRouter();

    const OnClickPlayer = (id) => {
        router.push(`/proplayer/playerInfo/${id}`)
    }

    if (router.isFallback) {
        return <LoadingSpinners/>
      }

    useEffect(() => {
        getplayerInfo(router.query.playerId)
    }, [router.query.playerId])
    
    return (
        <div>
            <img className="index-bg" src="/img/proplayerBg.jpg"/>
            <div className='container'>
                <div className="row pt-5">
                    <div className="col-5">
                        <div className="d-flex pt-5">
                            <div>
                                <img style={{borderRadius: '100px'}} src={playerInfo.avatarfull}/>
                            </div>
                            <div className='d-flex flex-column justify-content-center px-4'>
                                <p className='fs-1'>{playerInfo.name}</p>
                                <p className='fs-3'>{playerInfo.personaname}</p>
                            </div>
                        </div>
                        <div className="pt-4">
                            <p className='pt-1 fs-5'>player game: {prosPlayer[0].games}</p>
                            <p className='pt-1 fs-5'>player win: {prosPlayer[0].win}</p>
                            <p className='pt-1 fs-5'>player lose: {prosPlayer[0].games - prosPlayer[0].win}</p>
                            <p className='pt-1 fs-5'>team name: 
                                <a href={`/teams/teamInfo/${prosPlayer[0].team_id}`} className="hover-muted">
                                    {prosPlayer[0].team_name}
                                </a>
                            </p>
                            <p className='pt-1 fs-5'>last login: {prosPlayer[0].last_login}</p>
                            <p className='pt-1 fs-5'>
                                <a href={playerInfo.profileurl} className="hover-muted" target="_blank">
                                    <TrendingFlatIcon style={{marginRight: '.3rem'}}/>
                                    steam profile
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="col-4">
                        <p className='pt-1 fs-4' >pros player:</p>
                        <div>
                            {prosPlayer.map(pros => (
                                <div key={pros.account_id} className="prosplayer-list" onClick={() => OnClickPlayer(pros.account_id)}>
                                    <img style={{borderRadius: '50px', marginRight: '.6rem'}} src={pros.avatar}/>
                                    <p style={{fontSize: '1.2rem'}}>{pros.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    playerInfo: state.players.playerInfo
})

export default connect(mapStateToProps,{getplayerInfo})(PlayerDetails)



