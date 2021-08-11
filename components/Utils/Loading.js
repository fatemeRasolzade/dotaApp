import React, { useState, useEffect } from 'react'
import LoadingBar from 'react-top-loading-bar'

const Loading = () => {

    const [progress, setProgress] = useState(0);

    const timer = () => {
        if(progress < 100){
            setTimeout(() => {
                setProgress(progress+10)
            }, 50)
        }
    }  

    useEffect(() => {
        timer()
    }, [progress])

    return (
        <div>
            <LoadingBar 
                color='#42617e'
                height="4px"
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />

        </div>
    )
}

export default Loading
