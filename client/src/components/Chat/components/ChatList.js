import React from 'react'
import ChatListUser from './ChatListUser'
import SearchBar from '../../Navbar/SearchBar'

const ChatList = ({data, isLogged}) => {


    return (
        <div className='all-chats-box'>
            <div className='chat-search'>
                <SearchBar chat={true} isLogged={isLogged}/>
            </div>
            {data.get_chats.map(chat => 
                    <ChatListUser data={chat} key={chat.chatID}/>)}
            {data.get_chats.length === 0 && <p style={styles.emptyInbox} className='flex-ctr'>Empty inbox</p>}
        </div>
    )
}

export default ChatList


const styles = {
    emptyInbox:{
        width:'100%',
        height:'100px',
        color:'white',
    }
}