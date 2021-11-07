import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo'


const SEND_MSG = gql`
    mutation ($chatID: String!, $userID: Int!, $msg_text: String!, $url: String!){
        send_message (chatID: $chatID, userID: $userID, msg_text: $msg_text, url: $url){
            msgID
        }
    }
`


const SendMsg = ({chatid}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [send_msg] = useMutation(SEND_MSG)

    const sendMessage = (e) => {
        e.preventDefault()
        let msg_text = e.target.msg_text.value

        send_msg({
            variables: {
                userID: ls.userID,
                chatID: chatid,
                msg_text: msg_text,
                url: 'null'
            }
        }).then(()=>{
            e.target.msg_text.value = ''
        })
    }

    return (
        <form className='msg-input-box' onSubmit={sendMessage}>
            <input type='text' name='msg_text' placeholder='Send message...'></input>
            <button type='submit' className="fp-cmt-btn">SEND</button>
        </form>
    )
}

export default SendMsg