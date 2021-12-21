import React, { useCallback, useEffect, useLayoutEffect, useState, memo } from 'react'

import gql from 'graphql-tag'
import { useQuery, useMutation } from 'react-apollo'
import ChatBar from '../ChatBar'
import Message from '../Message'
import SendGroupMsg from './SendGroupMsg'
import GroupMessage from './GroupMessage'

const GroupChatMsgBox = ({chat}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [loader, setLoader] = useState(false)
    const [fetchBtn, setFetchBtn] = useState(false)
    // const [seen] = useMutation(SEEN)
    const messages = useQuery(GET_GROUP_MESSAGES, {
        variables: {
            groupChatId: chat.groupChatId,
            limit:50,
            offset:0        
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

                    if (newMsg?.groupChatId === chat.groupChatId){
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
    }, [chat, messages])        
    
    
    // useEffect(()=>{
    //     messages?.data?.get_messages?.length>=50 && setFetchBtn(true)
    //     seen({
    //         variables:{
    //             cid: chat.chatID,
    //             rid: ls.userID
    //         }
    //     })
    // }, [messages?.data, chat, ls.userID, seen])


    // const handleFetchMore = () => {
    //     messages?.fetchMore({
    //         variables:{
    //             offset: messages?.data?.get_messages?.length,
    //         },
    //         updateQuery: (prev, { fetchMoreResult }) => {
    //             if (!fetchMoreResult) return prev;
    //             if(fetchMoreResult?.get_messages?.length < 1) {
    //                 setFetchBtn(false)
    //                 return
    //             }
    //             return Object.assign({}, prev, {
    //               get_messages: [...messages?.data?.get_messages, ...fetchMoreResult?.get_messages]
    //             });
    //         }
    //     })
    //     return
    // }
      
    // if(messages.error) console.log(messages.error); 


    return (
        <div className='chat-msg-box'> 
        <>
            <ChatBar chatID={chat.groupChatId}/>
            <div className='chat-messages'>
                {loader && <div className='flex-ctr' style={styles.loader}><div className='small-spinner'></div></div>}
                {!messages.loading && messages?.data?.get_group_messages?.map(msg => <GroupMessage msg={msg} key={msg.time_sent} loader={loader}/>)}
                {fetchBtn && <div style={styles.loadMore}>Load more</div>}
            </div>
            <SendGroupMsg chatID={chat.groupChatId} info={chat} loaderCallback={loaderCallback}/> 
        </>
        </div>
    )
}

export default memo(GroupChatMsgBox)  


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

const GET_GROUP_MESSAGES = gql`
    query ($groupChatId: Int!, $limit: Int, $offset: Int){
        get_group_messages (groupChatId: $groupChatId, limit: $limit, offset: $offset){
            groupChatId
            msg_text
            userID
            type
            url
            time_sent
            username
            profile_picture
        }
    }
`
const NEW_MESSAGE = gql`
    subscription {
        newGroupMessage {
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
// const SEEN = gql`
//     mutation($cid: Int!, $rid: Int!){
//         seen(chatID: $cid, receiver_id: $rid){
//             chatID
//         }
//     }
// `