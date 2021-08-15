import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/dist/client/router'
import { connect } from 'react-redux';
import { getplayerInfo } from '../../../Redux/Action/playersAction';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';

export async function getStaticProps({ params }){
    const getProsPlayer = await fetch(`https://api.opendota.com/api/players/${params.pname}/pros`)
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
            pname: 88470
        },
        {
            pname: 639740
        },
        {
            pname: 1296625
        },
        {
            pname: 1400303
        },
        {
            pname: 1470116
        },
    ]
    const paths = posts.map((post) => ({
      params: { pname: post.pname.toString() },
    }))
    return { paths, fallback: true }
}

const playerDetails = ({playerInfo, getplayerInfo, wlPlayer, prosPlayer}) => {

    const router = useRouter();

    const OnClickPlayer = (id) => {
        router.push(`/proplayer/playerInfo/${id}`)
    }

    if (router.isFallback) {
        return (
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
        )
      }

    useEffect(() => {
        getplayerInfo(router.query.pname)
    }, [router.query.pname])
    
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
                                <a href="*" className="hover-muted" target="_blank">
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

export default connect(mapStateToProps,{getplayerInfo})(playerDetails)



