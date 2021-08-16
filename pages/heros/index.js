import React,{ useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { getHeros } from '../../Redux/Action/herosAction'

const Heros = ({getHeros, heros}) => {

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        initHeros()
    }, [])

    const initHeros = async () => {
        setLoading(true)
        await getHeros()
        setLoading(false)
    }

    return (
        <div>
            <img className="index-bg" src="/img/herosBg.jpg"/>
            <div className='container'>
                <h3 className="pt-5">Heros</h3>
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
                    {heros.map(h => (
                        <li key={h.id} className="player-list">
                            <div><p>{h.localized_name}</p></div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    heros: state.heros.heros
})

export default connect(mapStateToProps,{getHeros})(Heros)
