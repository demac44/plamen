import React from 'react'
import CommMessage from './CommMessage'

import { gql } from 'graphql-tag'
import { useQuery, useSubscription } from 'react-apollo'

const CommChatMsgBox = ({groupID}) => {
    const newMsg = useSubscription(NEW_MESSAGE)
    const {data, loading} = useQuery(GET_COMM_MESSAGES, {
        variables:{
            gid: groupID,
            limit:50,
            offset:0
        }
    })

    return (
        <div className='comm-msg-box'>
            {!loading && data?.get_community_messages.map(msg => <CommMessage msg={msg} key={msg.msgID}/>)}
        </div>
    )
}

export default CommChatMsgBox

const GET_COMM_MESSAGES = gql`
    query($gid: Int!, $limit: Int!, $offset: Int!){
        get_community_messages(groupID: $gid, limit: $limit, offset:$offset){
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
            chatID
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