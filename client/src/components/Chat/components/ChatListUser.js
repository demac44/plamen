import React from 'react'
import Avatar from '../../UI/Avatar'

const ChatListUser = ({data}) => {
    const ls = JSON.parse(localStorage.getItem('user'))

    return (
        <a href={'/chat/'+data.chatID} className='chat-user-box'>
            <Avatar height='100%' width='50px' pfp={data.profile_picture}/>
            <div className='chat-name-msg'>
                <p>{data.first_name+' '+data.last_name}</p>
                <p style={{fontSize:'12px'}}>{
                    (data?.mid===ls.userID ? 
                        'You: ' :
                        data.username+': ')+(data?.msg_text.length>35 ? data?.msg_text.slice(0,20)+'...' : data?.msg_text)
                    }</p>
            </div>  
        </a>
    )
}

export default ChatListUser
