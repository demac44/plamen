import React, { useEffect, useState, memo } from 'react'
import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { useParams } from 'react-router'

import { ChatList, ChatMsgBox } from '../../components/Chat/export'
import GroupChatMsgBox from '../../components/Chat/components/Group chat/GroupChatMsgBox'

const Chat = ({isLogged, isGroupChat}) => {
    const [chat, setChat] = useState(null)
    const ls = JSON.parse(localStorage.getItem('user'))
    const {chatid} = useParams()

    const {data, loading, error} = useQuery(isGroupChat ? GET_GROUP_CHATS : GET_CHATS, {
        variables:{userID: ls.userID},
    }) 

    useEffect(()=>{
        if(isGroupChat){
            data?.get_all_group_chats?.map(chat => {
                if(chat.groupChatId===parseInt(chatid)) return setChat(chat)
            })
        } else {
            data?.get_all_user_chats?.map(chat => {
                if(chat.chatID===parseInt(chatid)) return setChat(chat)
            })
        }
    }, [data, chatid])
  
    if(error) console.log(error); 

    return (
        <>
            {loading ? <div className='overlay flex-ctr'><div className='small-spinner'></div></div> :
                <>
                <ChatList isLogged={isLogged}/>
                {chat && (isGroupChat ? <GroupChatMsgBox chat={chat}/> : <ChatMsgBox chat={chat}/>)}
                </>
            }
        </>
    )
}

export default memo(Chat)


const GET_CHATS = gql`
    query ($userID: Int!){
        get_all_user_chats(user1_ID: $userID){
            chatID
        }
}`

const GET_GROUP_CHATS = gql`
    query ($userID: Int!){
        get_all_group_chats(userID: $userID){
            groupChatId
        }
    }
`