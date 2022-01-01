import React from 'react'
import { useSelector } from 'react-redux';

const StoryReply = ({userID}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)

    return (
        <form className='story-bottom-bar flex-ctr'>
            <input type='text' className='input story-reply-input' disabled={userID===uid} placeholder='Reply to story...'/>
            <button className='btn' disabled={userID===uid}>SEND</button>
        </form>
    )
}

export default StoryReply