import React from 'react'
import Navbar from '../Navbar/Navbar'
import AllChats from './components/AllChats'
import ChatBox from './components/ChatBox'
import {useParams} from 'react-router-dom'

const Chat = () => {

    const {chatid} = useParams()


    return (
        <>
            <Navbar callback={()=>{return}}/>
            <div className='wrapper'>
                <div className='main-chat'>
                    <AllChats/>
                    {chatid && <ChatBox chatid={chatid}/>}
                </div>
            </div>
        </>
    )
}

export default Chat