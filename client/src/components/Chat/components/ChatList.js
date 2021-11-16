import React from 'react'
import ChatListUser from './ChatListUser'
import SearchBar from '../../Navbar/SearchBar'

const ChatList = ({data}) => {
    return (
        <div className='all-chats-box'>
            <div className='chat-search'>
                <SearchBar chat={true}/>
            </div>
            {data.get_chats.map(chat => (chat.msg_text!=='' && chat.mid!=='') && 
            <ChatListUser data={chat} key={chat.chatID}/>)}
l        </div>
    )
}

export default ChatList
