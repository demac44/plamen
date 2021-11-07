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
    query ($chatID: String!){
        chat_exists (chatID: $chatID)
    }
`


const SendMsgBtn = ({userID}) => {
    const [create_chat] = useMutation(CREATE_CHAT)
    const ls = JSON.parse(localStorage.getItem('user'))
    const uid = ls.userID
    const chatID = userID+''+uid
    const {data, loading} = useQuery(CHAT_EXISTS, {variables: {chatID: chatID}})
    
    if(loading) return <p>loading</p>

    const createChat = () => {
        if(data?.chat_exists){
            console.log('exists');
        } else {
            create_chat({
                variables: {
                    chatID: chatID,
                    userID: uid,
                    secondUser: userID
                }
            })
        }
    } 


    return (
        <Link to={'/chat/'+chatID} className="pf-edit-follow-btn send-msg-btn" onClick={createChat}>
            <p>Send message</p> 
        </Link>
    )
}

export default SendMsgBtn
