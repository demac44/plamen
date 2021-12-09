import React from 'react'
import ChatList from '../../components/Chat/components/ChatList'
import ChatMsgBox from '../../components/Chat/components/ChatMsgBox'
import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { useParams } from 'react-router'
import ChatLoader from '../../components/General components/Loaders/ChatLoader'


const Chat = ({isLogged}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const {chatid} = useParams()

    const {data, loading, error} = useQuery(GET_CHATS, {
        variables:{userID: ls.userID},
    }) 
  
    if(loading) return <ChatLoader/>
    if(error) console.log(error); 

    return (
        <>
            <ChatList data={data} isLogged={isLogged}/>
            {(data?.get_chats?.map(info => info.chatID===parseInt(chatid) &&
            <ChatMsgBox chatid={chatid} info={info} key={info.chatID}/>))}
        </>
    )
}

export default Chat


const GET_CHATS = gql`
    query ($userID: Int!){
        get_chats(user1_ID: $userID){
            chatID
            username
            first_name
            last_name
            profile_picture
            userID
            date_created
        }
}`