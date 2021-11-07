import React from 'react'
import Avatar from '../../UI/Avatar'
import {Link} from 'react-router-dom'

const ChatUserBox = ({data}) => {
    return (
        <Link to={'/chat/'+data.chatID} className='chat-user-box'>
            <Avatar height='100%' width='50px' pfp={data.profile_picture}/>
            <div className='chat-name-msg'>
                <p>{data.first_name+' '+data.last_name}</p>
                <p style={{fontSize:'12px'}}>Sta ima?</p>
            </div>
            <i className="fas fa-ellipsis-v fp-options-btn" style={{fontSize:'25px', position:'absolute',right:'10px'}}></i>
        </Link>
    )
}

export default ChatUserBox
