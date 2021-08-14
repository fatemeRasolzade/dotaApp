import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/dist/client/router'
import { connect } from 'react-redux';
import { getplayerInfo } from '../../../Redux/Action/playersAction';

export async function getStaticProps({ params }){
    const getWlPlayer = await fetch(`https://api.opendota.com/api/players/${params.pname}/wl`)
    const wlPlayer = await getWlPlayer.json()
    const getProsPlayer = await fetch(`https://api.opendota.com/api/players/${params.pname}/pros`)
    const prosPlayer = await getProsPlayer.json()
    if(!wlPlayer) {
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
            wlPlayer: wlPlayer,
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
                <div className="pt-5">
                    {/* id {router.query.pname}  */}
                    <div className="d-flex pt-5">
                        <div>
                            <img style={{borderRadius: '100px'}} src={playerInfo.avatarfull}/>
                        </div>
                        <div className='d-flex flex-column justify-content-center px-4'>
                            <p style={{fontSize: '2.5rem', margin: '0'}}>{playerInfo.name}</p>
                            <p style={{fontSize: '1.5rem'}}>{playerInfo.personaname}</p>
                        </div>
                    </div>
                    <div className="pt-4">
                        <p style={{fontSize: '1.2rem', marginBottom: '0'}}>player win: {wlPlayer.win}</p>
                        <p style={{fontSize: '1.2rem'}}>player lose: {wlPlayer.lose}</p>
                        <p style={{fontSize: '1.5rem'}}>pros player:</p>
                        {prosPlayer.map(team => (
                            <div key={team.account_id} className="d-flex align-items-baseline" onClick={() => OnClickPlayer(team.account_id)}>
                                <div>
                                    <img style={{borderRadius: '50px', marginRight: '.6rem'}} src={team.avatar}/>
                                </div>
                                <div>
                                    <p style={{fontSize: '1.2rem'}}>{team.name}</p>
                                </div>
                            </div>
                        ))}
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