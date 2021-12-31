import React, {memo} from 'react'
import SearchBar from '../../../Navbar/SearchBar'
import ChatListUser from './ChatListUser'
import ChatsOptions from './ChatsOptions'
import { useSelector } from 'react-redux';
import ChatListGroup from '../Group chat/ChatListGroup'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'

import './style.css'

const ChatList = ({isLogged}) => {
    const uid = useSelector(state => state.isAuth.user?.userID)

    const {data, loading} = useQuery(GET_CHATS_LIST, {
        variables:{userID: uid}
    }) 

    return (
        <div className='all-chats-box flex-col'>
            <div className='chat-search'>
                <SearchBar isLogged={isLogged} chat={true} handleOpen={()=>{return}}/>
            </div>
            <ChatsOptions/>
            {!loading ?
            data?.get_chats?.map(chat => 
                    <ChatListUser data={chat} key={chat.chatID}/>)
                : <p className='flex-ctr empty-inbox'>Loading...</p>}

            {!loading && (data.get_chats.length === 0 && <p className='empty-inbox' className='flex-ctr'>Empty inbox</p>)}
            <p className='gc-title flex-ctr'>Group chats</p>
            {!loading && data?.get_group_chats?.map(gc => <ChatListGroup data={gc} key={gc.groupChatId}/>)}
        </div>
    )
}

export default memo(ChatList)

const GET_CHATS_LIST = gql`
    query ($userID: Int!){
        get_chats(user1_ID: $userID){
            chatID
            first_name
            last_name
            username
            profile_picture
            userID
            last_seen
        }
        get_group_chats (userID: $userID){
            groupChatId
            userID
            name
            group_image
        }
}`