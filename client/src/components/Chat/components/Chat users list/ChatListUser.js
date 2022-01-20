import React, { useEffect, useState, memo } from 'react'
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import Avatar from '../../../General components/Avatar'

import {gql} from 'graphql-tag'
import { useQuery, useSubscription } from 'react-apollo'

import './style.css'

const ChatListUser = ({data}) => {
    const uid = useSelector(state => state.isAuth.user?.userID)
    const usernm = useSelector(state => state?.isAuth?.user?.username)
    const newMsg = useSubscription(NEW_MESSAGE)
    const [msgData, setMsgData] = useState([])
    const info = useQuery(GET_INFO, {
        variables:{
            receiver: usernm,
            sender: data.username
        }
    })

    useEffect(()=>{
        setMsgData(info?.data)
        info?.refetch()
        return
    }, [data, info, newMsg?.data])
    
    return (
        <Link to={{pathname:'/chat/'+usernm+'/'+data?.username, 
                state:{
                    first_name: data?.first_name,
                    last_name: data?.last_name,
                    username: data?.username,
                    profile_picture: data?.profile_picture,
                    last_seen: data.last_seen
                }}}     
                className='chat-user-box flex-ac'>

            <Avatar size='50px' image={data?.profile_picture}/>

            <div className='chat-name-msg flex-col-sb'>
                <p>{data?.userID===uid? 'Me' : data?.first_name+' '+data?.last_name}</p>
                
                {!info.loading &&
                    <p style={{fontSize:'12px', 
                                color:info?.data?.last_message?.receiver===usernm ? 'white' : 'gray', 
                                fontWeight: info?.data?.last_message?.receiver===usernm ? 'bold' : 'lighter'}}>

                        {/* checking if message is from db or subscription and slicing it is too long */}
                        {(newMsg && (newMsg?.data?.newMessage?.receiver===usernm && newMsg?.data?.newMessage?.sender===data.username)) ? 
                            (newMsg?.data?.newMessage?.msg_text.length>25 ? newMsg?.data?.newMessage?.msg_text.slice(0,22)+'...' 
                                : newMsg?.data?.newMessage?.msg_text)
                            : (msgData?.last_message?.msg_text.length>25 ? msgData?.last_message?.msg_text.slice(0,22)+'...' 
                        : msgData?.last_message?.msg_text)}

                        {/* checking if msg type is image or video and setting corresponding message */}
                        {(msgData?.last_message?.type==='image' && !msgData?.last_message?.msg_text) && 
                            (info?.data.last_message?.sender===usernm ? 'You sent an image' : data?.username+' sent an image')}
                        {(msgData?.last_message?.type==='video' && !msgData?.last_message?.msg_text) && 
                            (info?.data.last_message?.sender===usernm ? 'You sent a video' : data?.username+' sent a video')}
                    </p>}
           </div>

            {/* show dot if unread or new message */}
            {(info?.data?.check_unread_msg || info?.data?.last_message?.receiver===usernm)
            && <div className='unread-msg-dot'></div>}

        </Link>
    )
}

export default memo(ChatListUser)


const GET_INFO = gql`
    query($receiver: String, $sender: String){
        check_unread_msg(receiver: $receiver)
        last_message(receiver: $receiver, sender: $sender){
            msg_text
            type
            receiver
            sender
        }
    }
    `

const NEW_MESSAGE = gql`
    subscription {
        newMessage {
            msgID
            msg_text
            userID
            url
            type
            time_sent
            sender
            receiver
        }
    }
`