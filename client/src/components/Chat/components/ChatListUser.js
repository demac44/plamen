import React from 'react'
import Avatar from '../../UI/Avatar'

const ChatListUser = ({data}) => {
    const ls = JSON.parse(localStorage.getItem('user'))

    return (
        <a href={'/chat/'+data.chatID} className='chat-user-box'>
            <Avatar height='100%' width='50px' pfp={data.profile_picture}/>
            <div className='chat-name-msg'>
                <p>{data.userID===ls.userID ? 'Me' : data.first_name+' '+data.last_name}</p>
                {data?.mid===ls.userID ? 
                <p style={{fontSize:'12px', color:'gray'}}>
                    {data?.msg_text.length>25 ? data?.msg_text.slice(0,25)+'...' : data?.msg_text}
                </p>    
                :
                <p style={{fontSize:'12px', fontWeight:'bold'}}>
                    {data?.msg_text.length>25 ? data?.msg_text.slice(0,25)+'...' : data?.msg_text}
                </p> 
                }
            </div>  
        </a>
    )
}

export default ChatListUser
