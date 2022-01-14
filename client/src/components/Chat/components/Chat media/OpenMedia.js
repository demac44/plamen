import React, { memo } from 'react'
import './style.css'

const OpenMedia = ({url, callback}) => {
    return (
        <div className='open-chat-media flex-ctr overlay' style={{backgroundColor:'#1b1b1b'}}
            onClick={()=>{callback(false)}}>
            <img src={url} loading='lazy' alt=''/>
        </div>
    )
}

export default memo(OpenMedia)

