import React, { useEffect, useState } from 'react'
import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { useParams } from 'react-router'
import ChatList from '../../components/Chat/components/Chat users list/ChatList'
import ChatMsgBox from '../../components/Chat/components/Messages/ChatMsgBox'
import GroupChatMsgBox from '../../components/Chat/components/Group chat/Messages/GroupChatMsgBox'
import { useSelector } from 'react-redux'

const Chat = ({isGroupChat}) => {
    const uid = useSelector(state => state.isAuth.user?.userID)
    const [isLoading, setIsLoading] = useState(false)


    return (
        <>
            {(isLoading) ? <div className='overlay flex-ctr'><div className='small-spinner'></div></div> :
                <>
                <ChatList/>
                <ChatMsgBox/>
                {/* <GroupChatMsgBox/> */}
                </>
            }
        </>
    )
}

export default Chat
