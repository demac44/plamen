import React from 'react'
import {gql} from 'graphql-tag'
import { useMutation, useQuery } from 'react-apollo'
import { useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'

const SendMsgBtn = ({user}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [create_chat] = useMutation(CREATE_CHAT)
    const {data, loading} = useQuery(CHAT_EXISTS, {variables: {user1:uid, user2:user.userID}}) 
    const history = useHistory()
    
    const createChat = () => {
        if(data?.chat_exists?.chatID){
            history.push({
                pathname:'/chat/'+data.chat_exists.chatID, 
                state: {
                    first_name: user?.first_name,
                    last_name: user?.last_name,
                    username: user?.username,
                    profile_picture: user?.profile_picture,
                    last_seen: user.last_seen
                }
            })
        } else {
            create_chat({
                variables: { 
                    user1: uid,
                    user2: user.userID
                }
            }).then(res=>history.push({
                pathname:'/chat/'+res.data.create_chat.chatID, 
                state: {
                    first_name: user?.first_name,
                    last_name: user?.last_name,
                    username: user?.username,
                    profile_picture: user?.profile_picture,
                    last_seen: user.last_seen
                }
            }))
        }
    } 
    
    return (
        <div className="profile-top-box-buttons btn send-msg-btn flex-ctr" onClick={()=>!loading && createChat()}>
            <p>{loading ? <div className='tiny-spinner'></div> : 'Send message'}</p> 
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