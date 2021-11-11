import React from 'react'
import {gql} from 'graphql-tag'
import { useMutation, useQuery } from 'react-apollo'
import { Link } from 'react-router-dom'



const CREATE_CHAT = gql`
    mutation ($chatID: String!, $userID: Int!, $secondUser: Int!){
        create_chat(chatID: $chatID, userID: $userID, second_userID: $secondUser){
            chatID
        }
    }
`
const CHAT_EXISTS = gql`
    query ($chatID: String!, $chatID2: String!){
        chat_exists (chatID: $chatID, chatID2: $chatID2){
            chatID
        }
    }
`


const SendMsgBtn = ({userID}) => {
    const [create_chat] = useMutation(CREATE_CHAT)
    const ls = JSON.parse(localStorage.getItem('user'))
    const uid = ls.userID
    const chatID = userID+''+uid
    const chatID2 = uid+''+userID
    const {data, loading} = useQuery(CHAT_EXISTS, {variables: {chatID, chatID2}}) 
    
    if(loading) return <p>loading</p>

    const createChat = () => {
        if(data?.chat_exists?.chatID){
            console.log('exists');
        } else {
            create_chat({
                variables: {
                    chatID,
                    chatID2,
                    userID: uid,
                    secondUser: userID
                }
            })
        }
    } 


    return (
        <Link to={'/chat/'+(data?.chat_exists?.chatID ? data?.chat_exists?.chatID : chatID)} className="pf-edit-follow-btn send-msg-btn" onClick={createChat}>
            <p>Send message</p> 
        </Link>
    )
}

export default SendMsgBtn
