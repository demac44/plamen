import React, { useCallback, useEffect, useLayoutEffect, useState, memo } from 'react'
import { useSelector } from 'react-redux';

import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import SendGroupMsg from './SendGroupMsg'
import GroupMessage from './GroupMessage'
import GroupChatBar from './GroupChatBar'

const GroupChatMsgBox = ({chat}) => {
    const uid = useSelector(state => state.isAuth.user?.userID)
    const [loader, setLoader] = useState(false)
    const [fetchBtn, setFetchBtn] = useState(false)
    // const [seen] = useMutation(SEEN)
    const messages = useQuery(GET_GROUP_MESSAGES, {
        variables: {
            groupChatId: chat.groupChatId,
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
    
    
    useEffect(()=>{
        messages?.data?.get_group_messages?.length>=50 && setFetchBtn(true)
        // seen({
        //     variables:{
        //         cid: chat.chatID,
        //         rid: ls.userID
        //     }
        // })
    }, [messages?.data, chat, uid])


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
            <GroupChatBar chatID={chat.groupChatId} admin={chat.admin}/>
            <div className='chat-messages'>
                {loader && <div className='flex-ctr' style={styles.loader}><div className='small-spinner'></div></div>}
                {!messages.loading && messages?.data?.get_group_messages?.map(msg => <GroupMessage msg={msg} key={msg.time_sent} loader={loader}/>)}
                {fetchBtn && <div style={styles.loadMore} onClick={handleFetchMore}>Load more</div>}
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
// const SEEN = gql`
//     mutation($cid: Int!, $rid: Int!){
//         seen(chatID: $cid, receiver_id: $rid){
//             chatID
//         }
//     }
// `