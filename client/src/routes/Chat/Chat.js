import React, { useEffect, useState, memo } from 'react'
import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { useParams } from 'react-router'

import { ChatList, ChatMsgBox } from '../../components/Chat/export'

const Chat = ({isLogged}) => {
    const [chat, setChat] = useState(null)
    const ls = JSON.parse(localStorage.getItem('user'))
    const {chatid} = useParams()

    const {data, loading, error} = useQuery(GET_CHATS, {
        variables:{userID: ls.userID},
    }) 

    useEffect(()=>{
        data?.get_chats?.map(chat => chat.chatID===parseInt(chatid) && setChat(chat))
    }, [data, chatid])
  
    if(error) console.log(error); 

    return (
        <>
            {loading ? <div className='overlay flex-ctr'><div className='small-spinner'></div></div> :
                <>
                <ChatList data={data} isLogged={isLogged}/>
                {chat && <ChatMsgBox chat={chat} key={chat?.chatID}/>}
                </>
            }
        </>
    )
}

export default memo(Chat)


const GET_CHATS = gql`
    query ($userID: Int!){
        get_chats(user1_ID: $userID){
            chatID
            username
            first_name
            last_name
            profile_picture
            userID
            date_created
        }
}`