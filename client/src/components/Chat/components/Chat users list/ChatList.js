import React, {memo} from 'react'
import './style.css'
import { useSelector } from 'react-redux';
import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import SearchBar from '../../../Navbar/Search bar/SearchBar'
import ChatListUser from './ChatListUser'
import ChatsOptions from './ChatsOptions'
import ChatListGroup from '../Group chat/ChatListGroup'

const ChatList = ({isLogged}) => {
    const uid = useSelector(state => state.isAuth.user?.userID)
    const usernm = useSelector(state => state?.isAuth?.user?.username)

    const {data, loading} = useQuery(GET_CHATS_LIST, {
        variables:{userID: uid,
        username: usernm}
    }) 

    return (
        <div className='all-chats-box flex-col'>
            <div className='chat-search'>
                <SearchBar isLogged={isLogged} chat={true} handleOpen={()=>{return}}/>
            </div>
            <ChatsOptions/>
            {!loading ? data?.get_chats?.map(chat => 
                    <ChatListUser data={chat} key={chat.userID}/>)
                : <p className='flex-ctr empty-inbox'>Loading...</p>}

            {!loading && (data.get_chats.length === 0 && <p className='empty-inbox flex-ctr'>Empty inbox</p>)}

            <p className='gc-title flex-ctr'>Group chats</p>
            
            {!loading && data?.get_group_chats?.map(gc => <ChatListGroup data={gc} key={gc.groupChatId}/>)}
        </div>
    )
}

export default memo(ChatList)

const GET_CHATS_LIST = gql`
    query ($userID: Int!, $username: String!){
        get_chats(username: $username){
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