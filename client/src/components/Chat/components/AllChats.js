import React from 'react'
import ChatUserBox from './ChatUserBox'
import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'


const GET_CHATS = gql`
    query ($userID: Int!){
        get_chats(userID: $userID){
            chatID
            username
            first_name
            last_name
            profile_picture
            userID
            msg_text
            mid
        }
    }
`
  
const AllChats = () => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const {data, loading} = useQuery(GET_CHATS, {
        variables:{userID: ls.userID}
    })


    if(loading) return <p>loading</p>

    return (
        <div className='all-chats-box'>
            {data?.get_chats?.map(chat => (chat.msg_text!=='' && chat.mid!=='') && <ChatUserBox data={chat} key={chat.chatID}/>)}
        </div>
    )
}

export default AllChats
