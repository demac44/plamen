import React, { useEffect, useLayoutEffect, useState } from 'react'
import SendMsg from '../Functional components/SendMsg'
import Message from './Message'


import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import ChatBar from './ChatBar'
import Loader from '../../UI/Loader'
 

const GET_MESSAGES = gql`
    query ($chatID: Int!){
        get_messages (chatID: $chatID){
            chatID
            msgID
            msg_text
            userID
        }
    }
`
const NEW_MESSAGE = gql`
    subscription {
        newMessage {
            chatID
            msgID
            msg_text
            userID
        }
    }
`


const ChatMsgBox = ({chatid, info}) => {
    const [dateCreated, setDateCreated] = useState('') 
    const {data, loading, subscribeToMore, error} = useQuery(GET_MESSAGES, {
        variables: {chatID: parseInt(chatid)},
    })


    const subscribeNewMessage = () => {
        return subscribeToMore && subscribeToMore({
            document: NEW_MESSAGE,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData?.data) return prev;
                const newMsg = subscriptionData.data.newMessage;
                
                if (newMsg.chatID === parseInt(chatid)){
                return Object.assign({}, prev, {
                    get_messages: [...prev.get_messages, newMsg]
                });
            }
        }});
    }

    const handleScroll = () => {
        let a = document.querySelector('.chat-messages')
        a && (a.scrollTop = a?.scrollHeight)  
    }     

    useLayoutEffect(()=>{ 
        subscribeNewMessage()
    }, [])           
    
    useEffect(()=>{
        let date = Date.parse(info.date_created)  
        date && (date = new Date(date).toDateString())  
        setDateCreated(date)
        handleScroll()   
    }, [data])
      
    if(error) console.log(error); 

    return (
        <div className='chat-box'> 
        {loading ? <div style={{width:'100%', height:'100%'}}><Loader/></div> :
        <>
            <ChatBar chatid={chatid} info={info}/>
            <div className='chat-messages'>
                <div className='chat-date-created'><p>This chat started on {dateCreated}</p></div>
                {data?.get_messages.map(msg => <Message msg={msg} key={msg.msgID}/>)}
            </div>
            <SendMsg chatid={chatid}/> 
        </>}
        </div>
    )
}

export default ChatMsgBox  
