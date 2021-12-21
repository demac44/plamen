import React from 'react'
import Navbar from '../../components/Navbar/Navbar'

import Chat from './Chat'
import AlternativeNavbar from '../../components/General components/AlternativeNavbar'

import '../../components/Chat/Chat.css'
 
const ChatCont = ({isLogged, isGroupChat}) => {
    return (
        <>
            {window.innerWidth > 991 && <Navbar isLogged={isLogged}/>}
            <AlternativeNavbar chat={true}/>
            <div className='wrapper'>
                <div className='container-chat'>
                    <Chat isLogged={isLogged} isGroupChat={isGroupChat}/>
                </div>
            </div>
        </>
    )
}

export default ChatCont