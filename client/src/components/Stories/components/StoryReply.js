import React from 'react'
import { useSelector } from 'react-redux';

const StoryReply = ({userID}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)

    return (
        <form className='story-bottom-bar'>
            <input type='text' style={styles.msgInput} disabled={userID===uid} placeholder='Reply to story...'/>
            <button className='btn' disabled={userID===uid} style={styles.btn}>SEND</button>
        </form>
    )
}

export default StoryReply

const styles = {
    msgInput:{
        width:'100%',
        height:'100%',
        backgroundColor:'#1b1b1b',
        color:'white',
        border:'none',
        outline:'none'
    },
    btn:{
        padding:'5px 10px'
    }
}
