import React, { useEffect } from 'react'
import ChatList from '../../components/Chat/components/ChatList'
import ChatMsgBox from '../../components/Chat/components/ChatMsgBox'
import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { useParams } from 'react-router'
import Loader from '../../components/UI/Loader'

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


const Chat = ({isLogged}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const {chatid} = useParams()

    const {data, loading, error, refetch} = useQuery(GET_CHATS, {
        variables:{userID: ls.userID},
    }) 

    useEffect(()=>{
        refetch()
    },[refetch])
  
    if(loading) return <div className='wh-100'><Loader/></div>
    if(error) console.log(error); 

    return (
        <>
            <ChatList data={data} isLogged={isLogged}/>
            {(data.get_chats.map(info => info.chatID===parseInt(chatid) &&
            <ChatMsgBox chatid={chatid} info={info} key={info.chatID}/>))}
        </>
    )
}

export default Chat
