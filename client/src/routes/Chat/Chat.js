import React, { useEffect, useState } from 'react'
import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { useParams } from 'react-router'
import ChatList from '../../components/Chat/components/Chat users list/ChatList'
import ChatMsgBox from '../../components/Chat/components/Messages/ChatMsgBox'
import GroupChatMsgBox from '../../components/Chat/components/Group chat/Messages/GroupChatMsgBox'
import { useSelector } from 'react-redux'

const Chat = ({isGroupChat}) => {
    const [chat, setChat] = useState(null)
    const uid = useSelector(state => state.isAuth.user?.userID)
    const {chatid} = useParams()
    const [isLoading, setIsLoading] = useState(false)

    const {data, loading, error} = useQuery(isGroupChat ? GET_GROUP_CHATS : GET_CHATS, {
        variables:{userID: uid},
    }) 

    useEffect(()=>{
        // getting all active chats of current user
        setIsLoading(true)
        if(isGroupChat){
            data?.get_all_group_chats?.map(c => ({
                c: c.groupChatId===parseInt(chatid) && setChat(c)
            }))
        } else {
            data?.get_all_user_chats?.map(c => ({
                c: c.chatID===parseInt(chatid) && setChat(c)
            }))
        }
        setIsLoading(false)
    }, [data, chatid, isGroupChat])
  
    if(error) console.log(error); 

    return (
        <>
            {(loading || isLoading) ? <div className='overlay flex-ctr'><div className='small-spinner'></div></div> :
                <>
                <ChatList/>
                {chat && (isGroupChat ? <GroupChatMsgBox chat={chat}/> : <ChatMsgBox chat={chat}/>)}
                </>
            }
        </>
    )
}

export default Chat


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