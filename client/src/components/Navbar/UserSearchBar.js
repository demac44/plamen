import React from 'react'
import  Avatar from '../UI/Avatar'
import {NavLink} from 'react-router-dom'
import {gql} from 'graphql-tag'
import { useMutation, useQuery } from 'react-apollo'

const CREATE_CHAT = gql`
    mutation ($user1: Int!, $user2: Int!){
        create_chat(user1: $user1, user2: $user2){
            chatID
        }
    }
`
const CHAT_EXISTS = gql`
    query ($user1:Int!,$user2:Int!){
        chat_exists (user1:$user1, user2:$user2){ 
            chatID
        }
    }
`

const UserSearchBar = ({user, chat}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [create_chat] = useMutation(CREATE_CHAT)
    const {data, loading} = useQuery(CHAT_EXISTS, {variables: {user1:ls.userID, user2:user.userID}}) 
    
    if(loading) return <p>loading</p>

    const createChat = () => {
        if(data?.chat_exists?.chatID){
            window.location.href = '/chat/'+data.chat_exists.chatID
            console.log('da');
        } else {
            create_chat({
                variables: { 
                    user1: ls.userID,
                    user2: user.userID
                }
            }).then(res=>{
                window.location.href = '/chat/'+res.data.create_chat.chatID
                console.log('created');
            })
        }
        console.log('asda');
    } 
    return (
        <>            
        {!chat ?
            <NavLink exact to={'/profile/'+user.userID} className='search-user-box'>
                <Avatar height='100%' width='56px' pfp={user.profile_picture}/>
                <div style={{marginLeft:'15px'}}>
                    <p>{user.first_name+' '+user.last_name}</p>
                    <h5>@{user.username}</h5>
                </div>
            </NavLink> :
            <div className='search-user-box' onClick={createChat}>
                <Avatar height='100%' width='56px' pfp={user.profile_picture}/>
                <div style={{marginLeft:'15px'}}>
                    <p>{user.first_name+' '+user.last_name}</p>
                    <h5>@{user.username}</h5>
                </div>
            </div>}
        </>
    )
}

export default UserSearchBar
