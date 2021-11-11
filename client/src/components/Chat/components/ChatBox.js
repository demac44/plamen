import React, { useEffect, useLayoutEffect, useState } from 'react'
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
        get_chat(chatID: $chatID){
            date_created
        }
    }
`
const NEW_MESSAGE = gql`
    subscription {
        newMessage {
            msgID
            msg_text
            userID
        }
    }
`


const ChatBox = ({chatid}) => {
    const [dateCreated, setDateCreated] = useState('') 
    const {data, loading, subscribeToMore} = useQuery(GET_MESSAGES, {
        variables: {chatID: chatid},
    })


    const subscribeNewMessage = () => {
        return subscribeToMore && subscribeToMore({
            document: NEW_MESSAGE,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData?.data) return prev;
                const newMsg = subscriptionData.data.newMessage;
                
                return Object.assign({}, prev, {
                    get_messages: [...prev.get_messages, newMsg] 
                });
            }
        });
    }

    const handleScroll = () => {
        let a = document.querySelector('.chat-messages')
        a && (a.scrollTop = a?.scrollHeight)  
    }     

    useLayoutEffect(()=>{ 
        subscribeNewMessage()
    }, [])           
    
    
    useEffect(()=>{
        let date = Date.parse(data?.get_chat?.date_created)  
        date && (date = new Date(date).toDateString())  
        console.log(date);
        setDateCreated(date)
        handleScroll()   
    }, [data])
      
    if(loading) return <p>loading</p>


    console.log(data);

    return (
        <div className='chat-box'> 
            <div className='chat-messages'>
                <div className='chat-date-created'><p>This chat started on {dateCreated}</p></div>
                {data?.get_messages.map(msg => <Message msg={msg} key={msg.msgID}/>)}
            </div>
            <SendMsg chatid={chatid}/> 
        </div>
    )
}

export default ChatBox  
