import React from 'react'
import { useParams } from 'react-router'
import { Redirect } from 'react-router-dom'
import ChatList from '../../components/Chat/components/Chat users list/ChatList'
import ChatMsgBox from '../../components/Chat/components/Messages/ChatMsgBox'
import GroupChatMsgBox from '../../components/Chat/components/Group chat/Messages/GroupChatMsgBox'
import { useSelector } from 'react-redux'

const Chat = ({isGroupChat}) => {
    const {curr_user} = useParams()
    const usernm = useSelector(state => state?.isAuth?.user?.username)


    return (
        <>
            <ChatList/>
            {
                curr_user===usernm ?
                <>
                {isGroupChat ?
                <GroupChatMsgBox/> :
                <ChatMsgBox/>}
                </> : <Redirect to='/chats'/>
            }
        </>
    )
}

export default Chat
