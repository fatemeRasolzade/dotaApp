import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { getPromatch } from '../../Redux/Action/matchsAction'

const promatch = ({promatches, getPromatch}) => {

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        initPromatch()
    }, [])

    const initPromatch = async () => {
        setLoading(true)
        getPromatch()
        setLoading(false)
    }

    return (
        <div>
            <img className="index-bg" src="/img/promatchBg.jpg"/>
            <div className='container'>
                <h3 className="pt-5">Promatches</h3>
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

const mapStateToProps = state => ({
    promatches: state.matchs.promatch
})

export default connect(mapStateToProps,{getPromatch})(promatch)
