import React, { useCallback, useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import AllChats from './components/AllChats'
import ChatBox from './components/ChatBox'
import {useParams} from 'react-router-dom'

import { gql } from 'graphql-tag'
import { useQuery } from 'react-apollo'
import LeftNavbar from '../UI/LeftNavbar'
import Loader from '../UI/Loader'

const GET_CHAT = gql`
    query ($chatID: Int!){
        get_chat(chatID: $chatID){
            user1_ID
            user2_ID
    }
}` 
 
const Chat = () => {
    const {chatid} = useParams()
    const ls = JSON.parse(localStorage.getItem('user'))
    const [leftnav, setLeftnav] = useState(false)
    const [displayLeftNav, setDisplayLeftNav] = useState(false)

    useEffect(()=>{
        window.innerWidth < 991 && setDisplayLeftNav(true)
    }, [])

    const leftNavCallback = useCallback(val =>{
        setLeftnav(val)
    }, [setLeftnav]) 


    const {data, loading, error} = useQuery(GET_CHAT, {
        variables: {chatID: parseInt(chatid) || 0}
    })

    if (loading) return <div className='wh-100'><Loader/></div>
    if(error) throw error

    return (
        <>
            <Navbar callback={leftNavCallback}/>
            <div className='wrapper'>
                <div className='main-chat'>
                    {displayLeftNav && <LeftNavbar show={leftnav}/>}
                    <AllChats/>
                    {(chatid && (data?.get_chat && data?.get_chat?.user1_ID===ls.userID || data?.get_chat?.user2_ID===ls.userID)) && <ChatBox chatid={chatid}/>}
                </div>
            </div>
        </>
    )
}

export default Chat