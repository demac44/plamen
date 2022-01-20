import React from 'react'
import { useParams } from 'react-router'
import ChatList from '../../components/Chat/components/Chat users list/ChatList'
import ChatMsgBox from '../../components/Chat/components/Messages/ChatMsgBox'
import { useSelector } from 'react-redux'

const Chat = () => {
    const {curr_user} = useParams()
    const usernm = useSelector(state => state?.isAuth?.user?.username)

    return (
        <>
            {((window.innerWidth<768 &&  window.location.pathname==='/chats') || window.innerWidth>768) && <ChatList/>}
            {curr_user===usernm && <ChatMsgBox/>}
        </>
    )
}

export default Chat


