import React, { useEffect, memo } from 'react'

import './style.css'

const OpenMedia = ({url, callback}) => {


    useEffect(()=>{
        document.querySelector('.chat-msg-box').style.zIndex = '100000000000'
    }, [])


    return (
        <div className='open-chat-media flex-ctr overlay' style={{backgroundColor:'#1b1b1b'}}
            onClick={()=>{
            document.querySelector('.chat-msg-box').style.zIndex = window.innerWidth < 768 ? '9999' : '999'
            callback(false)
        }}>
            <img src={url} alt=''/>
        </div>
    )
}

export default memo(OpenMedia)

