import React, { useCallback, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'

import LeftNavbar from '../../components/UI/LeftNavbar'

import Chat from './Chat'
 
 
const ChatCont = () => {
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
            <Navbar callback={leftNavCallback}/>
            <div className='wrapper'>
                <div className='main-chat'>
                    {displayLeftNav && <LeftNavbar show={leftnav}/>}
                    <Chat/>
                </div>
            </div>
        </>
    )
}

export default ChatCont