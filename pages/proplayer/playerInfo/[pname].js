import React, {useEffect} from 'react'
import { useRouter } from 'next/dist/client/router'
import { connect } from 'react-redux';
import { getplayerInfo } from '../../../Redux/Action/playersAction';

const playerDetails = ({profile, getplayerInfo}) => {

    const router = useRouter();

    useEffect(() => {
        getplayerInfo(router.query.pname)
    }, [])
    
    return (
        <div>
            <img className="index-bg" src="/img/proplayerBg.jpg"/>
            <div className='container'>
                <div className="pt-5">
                    id {router.query.pname}
                    <div>
                        <div>
                            <img src={profile.avatarfull}/>
                        </div>
                        <div>
                            <p>{profile.name}</p>
                            <p>{profile.personaname}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    profile: state.players.playerInfo.profile
})

export default connect(mapStateToProps,{getplayerInfo})(playerDetails)

