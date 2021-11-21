import React, { useEffect } from 'react'

const OpenMedia = ({url, callback}) => {


    useEffect(()=>{
        document.querySelector('.chat-msg-box').style.zIndex = '100000000000'
    }, [])


    return (
        <div className='open-chat-media flex-ctr' onClick={()=>{
            document.querySelector('.chat-msg-box').style.zIndex = window.innerWidth < 768 ? '9999' : '999'
            callback(false)
        }}>
            <img src={url}/>
        </div>
    )
}

export default OpenMedia
