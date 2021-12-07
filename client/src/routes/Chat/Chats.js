import React, { useCallback, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'

import Chat from './Chat'

import '../../components/Chat/Chat.css'
import '../../App.css'
import AlternativeNavbar from '../../components/General components/AlternativeNavbar'
 
const ChatCont = ({isLogged}) => {
    const [leftnav, setLeftnav] = useState(false)
    const [displayLeftNav, setDisplayLeftNav] = useState(false)

    useEffect(()=>{
        window.innerWidth < 991 && setDisplayLeftNav(true)
    }, [])

    const leftNavCallback = useCallback(val =>{
        setLeftnav(val)
    }, [setLeftnav]) 

    return (
        <>
            {window.innerWidth > 991 && <Navbar callback={leftNavCallback} isLogged={isLogged}/>}
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