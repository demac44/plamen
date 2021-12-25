import React, {memo} from 'react'
import {gql} from 'graphql-tag'
import { useMutation, useQuery } from 'react-apollo'
import Avatar from '../../General components/Avatar'
import UserLoader from '../../General components/Loaders/UserLoader'

const CREATE_CHAT = gql`
    mutation ($user1: Int!, $user2: Int!){
        create_chat(user1_ID: $user1, user2_ID: $user2){
            chatID
        }
    }
`
const CHAT_EXISTS = gql`
    query ($user1:Int!,$user2:Int!){
        chat_exists (user1_ID: $user1, user2_ID: $user2){ 
            chatID
        }
        if_user_blocked(blockedId: $user2, blockerId: $user1)
    }
`

const ChatSearchBarUser = ({user}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [create_chat] = useMutation(CREATE_CHAT)
    const {data, loading} = useQuery(CHAT_EXISTS, {variables: {user1:ls.userID, user2:user.userID}})  

    
    if(loading) return <UserLoader/>


    
    const createChat = () => {
        if(data?.if_user_blocked){
            window.location.href='/profile/'+user.username
        } else {
            if(data?.chat_exists?.chatID){
                window.location.href = '/chat/'+data.chat_exists.chatID
            } else {
                create_chat({
                    variables: { 
                        user1: ls.userID,
                        user2: user.userID
                    }
                }).then(res=>{
                    window.location.href = '/chat/'+res.data.create_chat.chatID
                })
            }
        }
    } 
    return (
        <div className='search-user-box' onClick={createChat}>
            <Avatar size='50px' image={user.profile_picture}/>
            <div style={{marginLeft:'15px'}}>
                <p>{user.first_name+' '+user.last_name}</p>
                <h5>@{user.username}</h5>
            </div>
        </div>
    )
}

export default memo(ChatSearchBarUser)
