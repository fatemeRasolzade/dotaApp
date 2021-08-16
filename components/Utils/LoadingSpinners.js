import React from 'react'

const LoadingSpinners = () => {
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

export default LoadingSpinners
