import React from 'react'
import SearchBar from '../../Navbar/SearchBar'
import MsgsLoader from './MsgsLoader'
import UserLoader from './UserLoader'

const ChatLoader = () => {
    return (
        <>
            <div className='all-chats-box'>
                <div className='chat-search'>
                    <SearchBar chat={true} isLogged={true}/>
                </div>
                <UserLoader/>
                <UserLoader/>
                <UserLoader/>
            </div>
            <MsgsLoader/>
        </>
    )
}

export default ChatLoader
