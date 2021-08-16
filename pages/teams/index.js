import React,{ useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { getTeams } from '../../Redux/Action/teamsAction'
import Link from 'next/link'

const Teams = ({getTeams, teams}) => {

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        initTeams()
    }, [])

    const initTeams = async () => {
        setLoading(true)
        await getTeams()
        setLoading(false)
    }

    return (
        <div>
            <img className="index-bg" src="/img/teamsBg.jpg"/>
            <div className='container'>
                <h3 className="pt-5">Teams</h3>
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
                    {teams.map(t => (
                        <Link href={`/teams/teamInfo/${t.team_id}`}>
                            <li key={t.team_id} className="player-list">
                                <div className="px-3"><img style={{width: '50px', height: '40px'}} src={t.logo_url}/></div>
                                <div><p>{t.name}</p></div>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    teams: state.teams.teams
})

export default  connect(mapStateToProps,{getTeams})(Teams)
