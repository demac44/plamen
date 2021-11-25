import React, { useEffect, useLayoutEffect, useState } from 'react'
import Avatar from '../../UI/Avatar'

import {gql} from 'graphql-tag'
import { useQuery, useSubscription } from 'react-apollo'


const COUNT_MSGS = gql`
    query($cid: Int!, $rid: Int!){
        count_msgs(chatID: $cid, receiver_id: $rid){
            msgCount
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

const ChatListUser = ({data}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const sub = useSubscription(NEW_MESSAGE)
    const [ccount, setCount] = useState(0)
    const count = useQuery(COUNT_MSGS, {
        variables:{
            cid: data?.chatID,
            rid: ls.userID
        }
    })

    useEffect(()=>{
        !count.loading && setCount(count?.data?.count_msgs?.msgCount)
    }, [data, count, sub?.data])

    
    return (
        <a href={'/chat/'+data.chatID} className='chat-user-box'>
            <Avatar height='100%' width='50px' pfp={data.profile_picture}/>
            <div className='chat-name-msg'>
                <p>{data.userID===ls.userID ? 'Me' : data.first_name+' '+data.last_name}</p>

                {data?.mid===ls.userID ? 
                <p style={{fontSize:'12px', color:'gray'}}>
                    {sub?.data ? (sub?.data?.newMessage.chatID===data.chatID ? sub.data.newMessage.msg_text : data?.msg_text) :
                    data?.msg_text && (data?.msg_text.length>25 ? data?.msg_text.slice(0,25)+'...' : data?.msg_text)}
                    {(data?.type==='image' && !data?.msg_text) && 'You sent an image'}
                    {(data?.type==='video' && !data?.msg_text) && 'You sent a video'}
                </p>    
                :
                <p style={{fontSize:'12px', fontWeight:'bold'}}>
                    {sub?.data ? (sub?.data?.newMessage.chatID===data.chatID ? sub.data.newMessage.msg_text : data?.msg_text) :
                    data?.msg_text && (data?.msg_text.length>25 ? data?.msg_text.slice(0,25)+'...' : data?.msg_text)}
                    {(data?.type==='image' && !data?.msg_text) && data.username+' sent an image'}
                    {(data?.type==='video' && !data?.msg_text) && data.username+' sent a video'}
                </p> 
                }
            </div>  
            {(ccount > 0 || (sub?.data?.newMessage.userID!==ls.userID) 
                && (sub?.data?.newMessage?.chatID===data.chatID))
                && <div style={styles.count}></div>}

        </a>
    )
}

export default ChatListUser


const styles = {
    count:{
        backgroundColor:'white',
        color:'white',
        padding:'6px',
        position:'absolute',
        top:'25px',
        right:'20px',
        borderRadius:'50%',
    }
}