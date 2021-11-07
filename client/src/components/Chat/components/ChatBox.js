import React from 'react'
import SendMsg from './Functional components/SendMsg'
import Message from './Message'


import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'


const GET_MESSAGES = gql`
    query ($chatID: String!){
        get_messages (chatID: $chatID){
            msgID
            msg_text
            userID
        }
    }
`

const ChatBox = ({chatid}) => {
    const {data, loading} = useQuery(GET_MESSAGES, {
        variables: {chatID: chatid},
        // pollInterval: 500
    })


    if(loading) return <p>loading</p>

    return (
        <div className='chat-box'>
            <div className='chat-messages'>
                {data?.get_messages.map(msg => <Message msg={msg} key={msg.msgID}/>)}
            </div>
            <SendMsg chatid={chatid}/>
        </div>
    )
}

export default ChatBox
