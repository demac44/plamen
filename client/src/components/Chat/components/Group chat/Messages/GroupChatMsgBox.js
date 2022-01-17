import React, { useCallback, useEffect, useLayoutEffect, useState, memo } from 'react'
import { useSelector } from 'react-redux';
import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import SendGroupMsg from './SendGroupMsg';
import GroupMessage from './GroupMessage';
import GroupChatBar from '../GroupChatBar';
import { useParams } from 'react-router-dom';

const GroupChatMsgBox = () => {
    const uid = useSelector(state => state.isAuth.user?.userID)
    const [loader, setLoader] = useState(false)
    const [fetchBtn, setFetchBtn] = useState(false)
    const {chatid} = useParams()
    const messages = useQuery(GET_GROUP_MESSAGES, {
        variables: {
            groupChatId: parseInt(chatid),
            limit:50,
            offset:0,
            uid        
        },
    })

    const loaderCallback = useCallback(val => {
        setLoader(val)
    }, [setLoader])

    
    useLayoutEffect(()=>{ 
        const subscribeNewMessage = () => {
            return messages?.subscribeToMore({
                document: NEW_MESSAGE,
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData?.data) return prev;
                    const newMsg = subscriptionData?.data?.newGroupMessage;

                    if (newMsg?.groupChatId === parseInt(chatid)){
                    return Object.assign({}, prev, {
                        get_group_messages: [newMsg, ...prev.get_group_messages],
                        scroll: ()=>{
                            let box = document.querySelector('.chat-messages')
                            box.scrollHeight = 0
                        }
                    });
                }
            }});
        }
        return subscribeNewMessage()
    }, [messages])        
    
    
    useEffect(()=>{
        messages?.data?.get_group_messages?.length>=50 && setFetchBtn(true)
    }, [messages?.data, uid])


    const handleFetchMore = () => {
        messages?.fetchMore({
            variables:{
                offset: messages?.data?.get_group_messages?.length,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                if(fetchMoreResult?.get_group_messages?.length < 1) {
                    setFetchBtn(false)
                    return
                }
                return Object.assign({}, prev, {
                  get_group_messages: [...messages?.data?.get_group_messages, ...fetchMoreResult?.get_group_messages]
                });
            }
        })
        return
    }
      
    if(messages.error) console.log(messages.error); 


    return (
        <div className='chat-msg-box'> 
        <>
            <GroupChatBar chatID={parseInt(chatid)}/>
            <div className='chat-messages'>
                {loader && <div className='flex-ctr msg-loader'><div className='small-spinner'></div></div>}
                {!messages.loading && messages?.data?.get_group_messages?.map(msg => <GroupMessage msg={msg} key={msg.time_sent} loader={loader}/>)}
                {fetchBtn && <div className='msg-load-more' onClick={handleFetchMore}>Load more</div>}
            </div>
            <SendGroupMsg chatID={parseInt(chatid)} loaderCallback={loaderCallback}/> 
        </>
        </div>
    )
}

export default memo(GroupChatMsgBox)  


const GET_GROUP_MESSAGES = gql`
    query ($groupChatId: Int!, $limit: Int, $offset: Int, $uid: Int!){
        get_group_messages (groupChatId: $groupChatId, limit: $limit, offset: $offset, userID: $uid){
            groupChatId
            msg_text
            userID
            type
            url
            time_sent
            username
            profile_picture
            msgID
        }
    }
`
const NEW_MESSAGE = gql`
    subscription {
        newGroupMessage {
            msgID
            groupChatId
            msg_text
            userID
            url
            type
            time_sent
            username
            profile_picture
        }
    }
`