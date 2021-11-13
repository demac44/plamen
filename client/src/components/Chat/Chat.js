import React from 'react'
import Navbar from '../Navbar/Navbar'
import AllChats from './components/AllChats'
import ChatBox from './components/ChatBox'
import {useParams} from 'react-router-dom'

import { gql } from 'graphql-tag'
import { useQuery } from 'react-apollo'

const GET_CHAT = gql`
    query ($chatID: Int!){
        get_chat(chatID: $chatID){
            user1_ID
            user2_ID
    }
}`
 
const Chat = () => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const {chatid} = useParams()
    const {data, loading} = useQuery(GET_CHAT, {
        variables: {chatID: parseInt(chatid)}
    })

    if(loading) return <p>loading</p>

    return (
        <>
            <Navbar callback={()=>{return}}/>
            <div className='wrapper'>
                <div className='main-chat'>
                    <AllChats/>
                    {(chatid && (data?.get_chat && data?.get_chat?.user1_ID===ls.userID || data?.get_chat?.user2_ID===ls.userID)) && <ChatBox chatid={chatid}/>}
                </div>
            </div>
        </>
    )
}

export default Chat