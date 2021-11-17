import React from 'react'
import  Avatar from '../UI/Avatar'
import {NavLink} from 'react-router-dom'
import {gql} from 'graphql-tag'
import { useMutation, useQuery } from 'react-apollo'

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
    }
`

const UserSearchBar = ({user, chat}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [create_chat] = useMutation(CREATE_CHAT)
    const {data, loading} = useQuery(CHAT_EXISTS, {variables: {user1:ls.userID, user2:user.userID}}) 

    if(loading) return (
        <div style={styles.loading}>
            <div style={styles.loadAvatar}></div>
            <div>
                <div style={styles.loadName}></div>
                <div style={styles.loadUsername}></div>
            </div>
        </div>)

    const createChat = () => {
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


const styles = {
    loading:{
        width:'100%',
        height:'60px',
        display:'flex',
        padding:'5px'
    },
    loadAvatar:{
        height:'95%',
        width:'50px',
        borderRadius:'50%',
        backgroundColor:'#7f7f7f'
    },
    loadName:{
        width:'100px',
        height:'10px',
        borderRadius:'10px',
        backgroundColor:'#7f7f7f',
        marginLeft:'10px',
        marginTop:'5px'
    },
    loadUsername:{
        width:'70px',
        height:'10px',
        borderRadius:'10px',
        backgroundColor:'#7f7f7f',
        marginLeft:'10px',
        marginTop:'15px'
    }
}