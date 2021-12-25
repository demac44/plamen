import React, { useEffect, useState, memo } from 'react'
import {Link} from 'react-router-dom'
import Avatar from '../../General components/Avatar'

import {gql} from 'graphql-tag'
import { useQuery, useSubscription } from 'react-apollo'

const ChatListUser = ({data}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const newMsg = useSubscription(NEW_MESSAGE)
    const [count, setCount] = useState(0)
    const [msgData, setMsgData] = useState([])
    const info = useQuery(GET_INFO, {
        variables:{
            cid: data?.chatID,
            rid: ls.userID
        }
    })

    useEffect(()=>{
        setCount(info?.data?.count_msgs?.msgCount)
        setMsgData(info?.data)
        info?.refetch()
        return
    }, [data, info, newMsg?.data])
    
    return (
        <Link to={{pathname:'/chat/'+data?.chatID, 
                state:{
                    first_name: data?.first_name,
                    last_name: data?.last_name,
                    username: data?.username,
                    profile_picture: data?.profile_picture,
                    last_seen: data.last_seen
                }}}     
                className='chat-user-box flex-h'>
            <Avatar size='45px' image={data?.profile_picture}/>
            <div className='chat-name-msg flex-col-sb'>
                <p style={{color:'white'}}>{data?.userID===ls?.userID ? 'Me' : data?.first_name+' '+data?.last_name}</p>
                
                {!info.loading &&
                <p style={{fontSize:'12px', 
                            color:info?.data?.last_message?.userID===ls.userID ? 'gray' : 'white', 
                            fontWeight: info?.data?.last_message?.userID===ls.userID ? 'lighter' : 'bold'}}>

                    {(newMsg && newMsg?.data && newMsg?.data?.newMessage?.chatID===data?.chatID) ? 
                        (newMsg?.data?.newMessage?.msg_text.length>25 ? newMsg?.data?.newMessage?.msg_text.slice(0,22)+'...' 
                            : newMsg?.data?.newMessage?.msg_text)
                        : (msgData?.last_message?.msg_text.length>25 ? msgData?.last_message?.msg_text.slice(0,22)+'...' 
                            : msgData?.last_message?.msg_text)}

                    {(msgData?.last_message?.type==='image' && !msgData?.last_message?.msg_text) && 
                        (info?.data.last_message?.userID===ls.userID ? 'You sent an image' : data?.username+' sent an image')}
                    {(msgData?.last_message?.type==='video' && !msgData?.last_message?.msg_text) && 
                        (info?.data.last_message?.userID===ls.userID ? 'You sent a video' : data?.username+' sent a video')}
                </p>}

            </div>  
            {(count > 0 || (newMsg?.data?.newMessage?.userID!==ls.userID
                && newMsg?.data?.newMessage?.chatID===data?.chatID))
                && <div style={styles.count}></div>}

        </Link>
    )
}

export default memo(ChatListUser)


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


const GET_INFO = gql`
    query($cid: Int!, $rid: Int){
        count_msgs(chatID: $cid, receiver_id: $rid){
            msgCount
        }
        last_message(chatID: $cid){
            msg_text
            type
            userID
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