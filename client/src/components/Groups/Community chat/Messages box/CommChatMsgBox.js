import React, { useEffect, useState } from 'react'
import { gql } from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { useSelector } from 'react-redux'
import CommMessage from './CommMessage'

const CommChatMsgBox = ({groupID, loader}) => {
    const uid = useSelector(state => state.isAuth.user?.userID)
    const [fetchBtn, setFetchBtn] = useState(false)
    const {data, loading, subscribeToMore, fetchMore} = useQuery(GET_COMM_MESSAGES, {
        variables:{
            gid: groupID,
            limit:50,
            offset:0,
            uid
        }
    })
    
    useEffect(()=>{ 
        data?.get_community_messages?.length>=50 && setFetchBtn(true)
        const subscribeNewMessage = () => {
            return subscribeToMore({
                document: NEW_MESSAGE,
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData?.data) return prev;
                    const newMsg = subscriptionData?.data?.newCommunityMessage;
                    
                    if (newMsg?.groupID === groupID){
                    return Object.assign({}, prev, {
                        get_community_messages: [newMsg, ...prev.get_community_messages],
                    });
                }
            }});
        }
        return subscribeNewMessage()
    }, [data, groupID, subscribeToMore])        

    const handleFetchMore = () => {
        fetchMore({
            variables:{
                offset: data?.get_community_messages?.length,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                if(fetchMoreResult?.get_community_messages?.length < 1) {
                    setFetchBtn(false)
                    return
                }
                return Object.assign({}, prev, {
                  get_community_messages: [...data?.get_community_messages, ...fetchMoreResult?.get_community_messages]
                });
            }
        })
        return
    }

    return (
        <div className='comm-msg-box'>
            {loader && <div className='flex-ctr msg-loader'><div className='small-spinner'></div></div>}
            {!loading && data?.get_community_messages.map(msg => <CommMessage msg={msg} key={msg.msgID}/>)}
            {fetchBtn && <div className='msg-load-more' onClick={handleFetchMore}>Load more</div>}
        </div>
    )
}

export default CommChatMsgBox

const GET_COMM_MESSAGES = gql`
    query($gid: Int!, $limit: Int!, $offset: Int!, $uid: Int!){
        get_community_messages(groupID: $gid, limit: $limit, offset:$offset, userID: $uid){
            groupID
            msgID
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
        newCommunityMessage {
            groupID
            msgID
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