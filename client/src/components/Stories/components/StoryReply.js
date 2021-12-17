import React from 'react'

const StoryReply = ({userID}) => {
    const ls = JSON.parse(localStorage.getItem('user'))

    return (
        <form className='story-bottom-bar'>
            <input type='text' style={styles.msgInput} disabled={userID===ls.userID} placeholder='Reply to story...'/>
            <button className='btn' disabled={userID===ls.userID} style={styles.btn}>SEND</button>
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
