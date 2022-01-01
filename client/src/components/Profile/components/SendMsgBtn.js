import React from 'react'
import {gql} from 'graphql-tag'
import { useMutation, useQuery } from 'react-apollo'
import { useSelector } from 'react-redux';

const SendMsgBtn = ({userID}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [create_chat] = useMutation(CREATE_CHAT)
    const {data, loading} = useQuery(CHAT_EXISTS, {variables: {user1:uid, user2:userID}}) 
    
    const createChat = () => {
        if(data?.chat_exists?.chatID){
            window.location.href = '/chat/'+data.chat_exists.chatID
        } else {
            create_chat({
                variables: { 
                    user1: uid,
                    user2: userID
                }
            }).then(res=>window.location.href = '/chat/'+res.data.create_chat.chatID)
        }
    } 
    
    return (
        <div className="profile-top-box-buttons btn send-msg-btn" onClick={()=>!loading && createChat()}>
            <h4>{loading ? 'Loading...' : 'Send message'}</h4> 
        </div>
    )
}

export default SendMsgBtn

const CREATE_CHAT = gql`
    mutation ($user1: Int!, $user2: Int!){
        create_chat(user1_ID: $user1, user2_ID: $user2){
            chatID
        }
    }
`
const CHAT_EXISTS = gql`
    query ($user1:Int!,$user2:Int!){
        chat_exists (user1_ID:$user1, user2_ID:$user2){ 
            chatID
        }
    }
`