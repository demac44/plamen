import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
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
            type
            url
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
            url
            type
        }
    }
`


const ChatMsgBox = ({chatid, info}) => {
    const [dateCreated, setDateCreated] = useState('') 
    const [loader, setLoader] = useState(false)
    const {data, loading, subscribeToMore, error} = useQuery(GET_MESSAGES, {
        variables: {chatID: parseInt(chatid)},
    })

    const loaderCallback = useCallback(val => {
        setLoader(val)
    }, [setLoader])

    useLayoutEffect(()=>{ 
        const subscribeNewMessage = () => {
            return subscribeToMore && subscribeToMore({
                document: NEW_MESSAGE,
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData?.data) return prev;
                    const newMsg = subscriptionData.data.newMessage;
                    
                    if (newMsg.chatID === parseInt(chatid)){
                    return Object.assign({}, prev, {
                        get_messages: [newMsg, ...prev.get_messages],
                        scroll: ()=>{
                            let box = document.querySelector('.chat-messages')
                            box.scrollHeight = 0
                        }
                    });
                }
            }});
        }
        subscribeNewMessage()
    }, [chatid, subscribeToMore])           
    
    useEffect(()=>{
        let date = Date.parse(info.date_created)  
        date && (date = new Date(date).toDateString())  
        setDateCreated(date)
    }, [data, info?.date_created])
      
    if(error) console.log(error); 

    return (
        <div className='chat-msg-box'> 
        {loading ? <div style={{width:'100%', height:'100%'}}><Loader/></div> :
        <>
            <ChatBar chatid={chatid} info={info}/>
            <div className='chat-messages'>
                {loader && <div className='flex-ctr' style={styles.loader}><Loader size='small'/></div>}
                {data?.get_messages.map(msg => <Message msg={msg} key={msg.msgID} loader={loader}/>)}
                <div className='chat-date-created'><p>This chat started on {dateCreated}</p></div>
            </div>
            <SendMsg chatid={chatid} loaderCallback={loaderCallback}/> 
        </>}
        </div>
    )
}

export default ChatMsgBox  


const styles = {
    loader: {
        width:'20%',
        height:'100px',
        backgroundColor:'black',
        alignSelf:'flex-end',
        marginTop:'20px',
        zIndex:'1'
    }
}