import React, {memo} from 'react'
import {gql} from 'graphql-tag'
import { useMutation, useQuery } from 'react-apollo'
import { useSelector } from 'react-redux';
import Avatar from '../../../General components/Avatar'
import UserLoader from '../../../General components/Loaders/UserLoader'
import { useHistory } from 'react-router-dom';

const ChatSearchBarUser = ({user}) => {
    const uid = useSelector(state => state.isAuth.user?.userID)
    const [create_chat] = useMutation(CREATE_CHAT)
    const {data, loading} = useQuery(CHAT_EXISTS, {variables: {user1:uid, user2:user.userID}})  
    const history = useHistory()

    if(loading) return <UserLoader/>

    const createChat = () => {
        if(data?.if_user_blocked){
            window.location.href='/profile/'+user.username
        } else {
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
                }).then(res=>{
                    history.push({
                        pathname:'/chat/'+res.data.create_chat.chatID, 
                        state: {
                            first_name: user?.first_name,
                            last_name: user?.last_name,
                            username: user?.username,
                            profile_picture: user?.profile_picture,
                            last_seen: user.last_seen
                        }
                    })
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