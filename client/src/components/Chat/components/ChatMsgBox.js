import React, { useCallback, useEffect, useState, memo } from 'react'
import { useSelector } from 'react-redux';
import SendMsg from './SendMsg'
import Message from './Message'

import gql from 'graphql-tag'
import { useQuery, useMutation } from 'react-apollo'
import ChatBar from './ChatBar'

const ChatMsgBox = ({chat}) => {
    const uid = useSelector(state => state.isAuth.user?.userID)
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

    
    useEffect(()=>{ 
        const subscribeNewMessage = () => {
            return messages?.subscribeToMore({
                document: NEW_MESSAGE,
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData?.data) return prev;
                    const newMsg = subscriptionData?.data?.newMessage;
                    
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
        return subscribeNewMessage()
    }, [chat, messages])        
    
    
    useEffect(()=>{
        messages?.data?.get_messages?.length>=50 && setFetchBtn(true)
        seen({
            variables:{
                cid: chat?.chatID,
                rid: uid
            }
        })
    }, [messages?.data, chat, seen, uid])


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
        return
    }
      
    if(messages.error) console.log(messages.error); 

    return (
        <div className='chat-msg-box'> 
            <ChatBar chatID={chat.chatID} info={chat}/>
            <div className='chat-messages'>
                {loader && <div className='flex-ctr msg-loader'><div className='small-spinner'></div></div>}
                {!messages.loading && messages?.data?.get_messages?.map(msg => <Message msg={msg} key={msg.msgID} loader={loader}/>)}
                {fetchBtn && <div className='msg-load-more' onClick={handleFetchMore}>Load more</div>}
            </div>
            <SendMsg chatID={chat.chatID} info={chat} loaderCallback={loaderCallback}/> 
        </div>
    )
}

export default memo(ChatMsgBox)  

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
            username
            profile_picture
            storyID
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
            username
            profile_picture
            storyID
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