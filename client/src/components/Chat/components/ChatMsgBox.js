import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import SendMsg from './SendMsg'
import Message from './Message'


import gql from 'graphql-tag'
import { useQuery, useMutation } from 'react-apollo'
import ChatBar from './ChatBar'
import MsgsLoader from '../../General components/Loaders/MsgsLoader'


const ChatMsgBox = ({chat, info}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [loader, setLoader] = useState(false)
    const [fetchBtn, setFetchBtn] = useState(false)
    const [seen] = useMutation(SEEN)
    const messages = useQuery(GET_MESSAGES, {
        variables: {
            chatID: chat.chatID,
            limit:50,
            offset:0
        },
    })

    const loaderCallback = useCallback(val => {
        setLoader(val)
    }, [setLoader])

    useLayoutEffect(()=>{ 
        const subscribeNewMessage = () => {
            return messages && messages.subscribeToMore({
                document: NEW_MESSAGE,
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData?.data) return prev;
                    const newMsg = subscriptionData.data.newMessage;
                    
                    if (newMsg?.chatID === chat.chatID){
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
    }, [chat, messages?.subscribeToMore])        
    
    
    useEffect(()=>{
        messages?.data?.get_messages?.length>=50 && setFetchBtn(true)
        seen({
            variables:{
                cid: chat.chatID,
                rid: ls.userID
            }
        })
    }, [messages?.data, chat, ls.userID, seen])


    const handleFetchMore = () => {
        messages?.fetchMore({
            variables:{
                offset: messages?.data?.get_messages?.length,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                if(fetchMoreResult?.get_messages?.length < 1) {
                    setFetchBtn(false)
                    return
                }
                return Object.assign({}, prev, {
                  get_messages: [...messages?.data?.get_messages, ...fetchMoreResult?.get_messages]
                });
            }
        })
    }
      
    if(messages.error) console.log(messages.error); 

    return (
        <div className='chat-msg-box'> 
        {messages?.loading ? <MsgsLoader/> :
        <>
            <ChatBar chatID={chat.chatID} info={chat}/>
            <div className='chat-messages'>
                {loader && <div className='flex-ctr' style={styles.loader}><div className='small-spinner'></div></div>}
                {messages?.data?.get_messages.map(msg => <Message msg={msg} key={msg.msgID} loader={loader}/>)}
                {fetchBtn && <div style={styles.loadMore} onClick={handleFetchMore}>Load more</div>}
            </div>
            <SendMsg chatID={chat.chatID} info={chat} loaderCallback={loaderCallback}/> 
        </>}
        </div>
    )
}

export default ChatMsgBox  


const styles = {
    loader: {
        padding:'60px 100px 30px 0',
        alignSelf:'flex-end',
        zIndex:'1'
    },
    loadMore:{
        width:'100%',
        padding:'5px',
        backgroundColor:'#1f1f1f',
        textAlign:'center',
        cursor:'pointer',
        color:'white'
    }
}

const GET_MESSAGES = gql`
    query ($chatID: Int!, $limit: Int, $offset: Int){
        get_messages (chatID: $chatID, limit: $limit, offset: $offset){
            chatID
            msgID
            msg_text
            userID
            type
            url
            time_sent
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
            time_sent
        }
    }
`
const SEEN = gql`
    mutation($cid: Int!, $rid: Int!){
        seen(chatID: $cid, receiver_id: $rid){
            chatID
        }
    }
`