import React from 'react'
import { useParams } from 'react-router'
import { Redirect } from 'react-router-dom'
import ChatList from '../../components/Chat/components/Chat users list/ChatList'
import ChatMsgBox from '../../components/Chat/components/Messages/ChatMsgBox'
import GroupChatMsgBox from '../../components/Chat/components/Group chat/Messages/GroupChatMsgBox'
import { useSelector } from 'react-redux'

const Chat = ({isGroupChat, chatMsgBox}) => {
    const {curr_user} = useParams()
    const usernm = useSelector(state => state?.isAuth?.user?.username)

    return (
        <>
            {((window.innerWidth<768 &&  window.location.pathname==='/chats') || window.innerWidth>768) && <ChatList/>}
            <>
            {curr_user===usernm ?
            <ChatMsgBox/>
            : <Redirect to='/chats'/>}
            </> 
        </>
    )
}

export default Chat


