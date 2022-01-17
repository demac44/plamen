import React, { useCallback, useEffect, useState, memo } from 'react'
import { useSelector } from 'react-redux';
import gql from 'graphql-tag'
import { useQuery, useMutation } from 'react-apollo'
import SendMsg from './SendMsg';
import Message from './Message';
import ChatBar from '../ChatBar';
import { useParams } from 'react-router-dom';

const ChatMsgBox = () => {
    const usernm = useSelector(state => state?.isAuth?.user?.username)
    const {user} = useParams()
    const [loader, setLoader] = useState(false)
    const [fetchBtn, setFetchBtn] = useState(false)
    const [del_msg_notif] = useMutation(DELETE_MSG_NOTIFICATIONS)
    const {data, loading, subscribeToMore, fetchMore} = useQuery(GET_MESSAGES, {
        skip: user ? false : true,
        variables: {
            limit:50,
            offset:0,
            sender: usernm,
            receiver: user
        },
    })


    const loaderCallback = useCallback(val => {
        setLoader(val)
    }, [setLoader])

    
    useEffect(()=>{ 
        const subscribeNewMessage = () => {
            return subscribeToMore({
                document: NEW_MESSAGE,
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData?.data) return prev;
                    const newMsg = subscriptionData?.data?.newMessage;
                    
                    if ((newMsg?.sender === user && newMsg.receiver===usernm) || (newMsg?.sender === usernm && newMsg.receiver===user)){
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
    }, [loading])        
    
    
    useEffect(()=>{
        data?.get_messages?.length>=50 && setFetchBtn(true)
        del_msg_notif({
            variables:{
                receiver: usernm,
                sender: user
            }
        })
    }, [data, usernm, user, loading])


    const handleFetchMore = () => {
        fetchMore({
            variables:{
                offset: data?.get_messages?.length,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                if(fetchMoreResult?.get_messages?.length < 1) {
                    setFetchBtn(false)
                    return
                }
                return Object.assign({}, prev, {
                  get_messages: [...data?.get_messages, ...fetchMoreResult?.get_messages]
                });
            }
        })
        return
    }
      

    return (
        <div className='chat-msg-box'> 
        {user &&
            <>
            <ChatBar/>
            <div className='chat-messages'>
                {loader && <div className='flex-ctr msg-loader'><div className='small-spinner'></div></div>}
                {!loading && data?.get_messages?.map(msg => <Message msg={msg} key={msg.msgID} loader={loader}/>)}
                {fetchBtn && <div className='msg-load-more' onClick={handleFetchMore}>Load more</div>}
            </div>
            <SendMsg loaderCallback={loaderCallback}/>    
        </>}
        </div>
    )
}

export default memo(ChatMsgBox)  

const GET_MESSAGES = gql`
    query ($sender: String!, $receiver: String!, $limit: Int, $offset: Int){
        get_messages (sender: $sender, receiver: $receiver, limit: $limit, offset: $offset){
            msgID
            msg_text
            userID
            type
            url
            time_sent
            profile_picture
            storyID
            sender
            receiver
        }
    }
`
const NEW_MESSAGE = gql`
    subscription {
        newMessage {
            msgID
            msg_text
            url
            type
            time_sent
            profile_picture
            storyID
            sender
            receiver
        }
    }
`

const DELETE_MSG_NOTIFICATIONS = gql`
    mutation($sender: String!, $receiver: String!){
        delete_msg_notifications(sender: $sender, receiver: $receiver){
            receiver
        }
    }
`