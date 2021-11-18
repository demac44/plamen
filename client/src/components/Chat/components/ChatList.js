import React from 'react'
import ChatListUser from './ChatListUser'
import SearchBar from '../../Navbar/SearchBar'

const ChatList = ({data, isLogged}) => {

    return (
        <div className='all-chats-box'>
            <div className='chat-search'>
                <SearchBar chat={true} isLogged={isLogged}/>
            </div>
            {data.get_chats.map(chat => chat.mid && 
            <ChatListUser data={chat} key={chat.chatID}/>)}
l        </div>
    )
}

export default ChatList
