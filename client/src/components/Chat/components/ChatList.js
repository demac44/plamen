import React, {memo} from 'react'
import SearchBar from '../../Navbar/SearchBar'
import ChatListUser from './ChatListUser'
import ChatsOptions from './ChatsOptions'
import { useSelector } from 'react-redux';

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import ChatListGroup from './Group chat/ChatListGroup'

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
                : <p style={styles.emptyInbox} className='flex-ctr'>Loading...</p>}
            {!loading && (data.get_chats.length === 0 && <p style={styles.emptyInbox} className='flex-ctr'>Empty inbox</p>)}
            <p style={styles.title}>Group chats</p>
            {!loading && data?.get_group_chats?.map(gc => <ChatListGroup data={gc} key={gc.groupChatId}/>)}
        </div>
    )
}

export default memo(ChatList)


const styles = {
    emptyInbox:{
        width:'100%',
        height:'100px',
        color:'white',
    },
    title:{
        width:'100%',
        padding:'5px',
        color:'white',
        textAlign:'center',
        border:'1px solid #2f2f2f',
        borderRadius:'10px',
        backgroundColor:'#1f1f1f',
        margin:'5px 0 5px 0'
    }
}

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