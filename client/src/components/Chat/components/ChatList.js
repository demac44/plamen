import React, {memo} from 'react'
import SearchBar from '../../Navbar/SearchBar'
import ChatListUser from './ChatListUser'

const ChatList = ({data, isLogged}) => {
    return (
        <div className='all-chats-box'>
            <div className='chat-search'>
                <SearchBar isLogged={isLogged} chat={true}/>
            </div>
            {data ?
            data.get_chats.map(chat => 
                    <ChatListUser data={chat} key={chat.chatID}/>)
                : <p style={styles.emptyInbox} className='flex-ctr'>Loading...</p>}
            {data && (data.get_chats.length === 0 && <p style={styles.emptyInbox} className='flex-ctr'>Empty inbox</p>)}
        </div>
    )
}

export default memo(ChatList)


const styles = {
    emptyInbox:{
        width:'100%',
        height:'100px',
        color:'white',
    }
}