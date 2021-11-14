import React from 'react'
import ChatListUser from './ChatListUser'

const ChatList = ({data}) => {
    return (
        <div className='all-chats-box'>
            {data.get_chats.map(chat => (chat.msg_text!=='' && chat.mid!=='') && <ChatListUser data={chat} key={chat.chatID}/>)}
l        </div>
    )
}

export default ChatList
