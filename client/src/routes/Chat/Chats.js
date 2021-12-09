import React from 'react'
import Navbar from '../../components/Navbar/Navbar'

import Chat from './Chat'

import '../../components/Chat/Chat.css'
import '../../App.css'
import AlternativeNavbar from '../../components/General components/AlternativeNavbar'
 
const ChatCont = ({isLogged}) => {
    return (
        <>
            {window.innerWidth > 991 && <Navbar isLogged={isLogged}/>}
            <AlternativeNavbar chat={true}/>
            <div className='wrapper'>
                <div className='container-chat'>
                    <Chat isLogged={isLogged}/>
                </div>
            </div>
        </>
    )
}

export default ChatCont