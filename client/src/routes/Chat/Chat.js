import React, { useEffect, useState, memo } from 'react'
import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { useParams } from 'react-router'

import { ChatList, ChatMsgBox } from '../../components/Chat/export'
import GroupChatMsgBox from '../../components/Chat/components/Group chat/Messages/GroupChatMsgBox'
import { useSelector } from 'react-redux'

const Chat = ({isLogged, isGroupChat}) => {
    const [chat, setChat] = useState(null)
    const uid = useSelector(state => state.isAuth.user?.userID)
    const {chatid} = useParams()

    const {data, loading, error} = useQuery(isGroupChat ? GET_GROUP_CHATS : GET_CHATS, {
        variables:{userID: uid},
    }) 

    useEffect(()=>{
        if(isGroupChat){
            data?.get_all_group_chats?.forEach(c => {
                if(c.groupChatId===parseInt(chatid)) return setChat(c)
            })
        } else {
            data?.get_all_user_chats?.forEach(c => {
                if(c.chatID===parseInt(chatid)) return setChat(c)
            })
        }
    }, [data, chatid, isGroupChat])
  
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
            userID
        }
}`

const GET_GROUP_CHATS = gql`
    query ($userID: Int!){
        get_all_group_chats(userID: $userID){
            groupChatId
            admin
        }
    }
`