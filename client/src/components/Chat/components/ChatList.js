import React, {memo} from 'react'
import SearchBar from '../../Navbar/SearchBar'
import ChatListUser from './ChatListUser'
import ChatsOptions from './ChatsOptions'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'

const ChatList = ({isLogged}) => {
    const ls = JSON.parse(localStorage.getItem('user'))

    const {data, loading} = useQuery(GET_CHATS_LIST, {
        variables:{userID: ls.userID},
    }) 

    return (
        <div className='all-chats-box flex-col'>
            <div className='chat-search'>
                <SearchBar isLogged={isLogged} chat={true}/>
            </div>
            <ChatsOptions/>
            {!loading ?
            data.get_chats.map(chat => 
                    <ChatListUser data={chat} key={chat.chatID}/>)
                : <p style={styles.emptyInbox} className='flex-ctr'>Loading...</p>}
            {!loading && (data.get_chats.length === 0 && <p style={styles.emptyInbox} className='flex-ctr'>Empty inbox</p>)}
        </div>
    )
}

export default memo(ChatList)


const styles = {
    emptyInbox:{
        width:'100%',
        height:'100px',
        color:'white',
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
        }
}`