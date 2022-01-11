import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../../General components/Avatar'
import { useSelector } from 'react-redux';

import {gql} from 'graphql-tag'
import { useQuery, useSubscription } from 'react-apollo'

import './style.css'

const ChatListGroup = ({data}) => {
    const uid = useSelector(state => state.isAuth.user?.userID)
    const newMsg = useSubscription(NEW_GROUP_MESSAGE)
    const [msgData, setMsgData] = useState([])
    const info = useQuery(LAST_MESSAGE_GROUP, {
        variables:{
            gcId: data?.groupChatId
        }
    })

    useEffect(()=>{
        setMsgData(info?.data)
        info?.refetch()
        return
    }, [data, info, newMsg?.data])


    return (
        <Link to={{pathname:'/chat/group/'+data?.groupChatId, 
                state:{
                    name: data?.name,
                    group_image: data?.group_image,
                    isGroupChat: true
                }}}     
                className='chat-user-box flex-ac'>

            <Avatar size='45px' image={data?.group_image}/>

            <div className='chat-name-msg flex-col-sb'>  
                <p style={{color:'white'}}>{data.name}</p>
           
                {!info.loading &&
                <p style={{fontSize:'12px', 
                            color:info?.data?.last_group_message?.userID===uid ? 'gray' : 'white', 
                            fontWeight: info?.data?.last_group_message?.userID===uid ? 'lighter' : 'bold'}}>

                    {/* checking if last message is from db or subscription and slicing message if too long */}
                    {(newMsg && newMsg?.data && newMsg?.data?.newGroupMessage?.groupChatId===data?.groupChatId) ? 
                        (newMsg?.data?.newGroupMessage?.msg_text.length>25 ? newMsg?.data?.newGroupMessage?.msg_text.slice(0,22)+'...' 
                            : newMsg?.data?.newGroupMessage?.msg_text)
                        : (msgData?.last_group_message?.msg_text.length>25 ? msgData?.last_group_message?.msg_text.slice(0,22)+'...' 
                            : msgData?.last_group_message?.msg_text)}

                    {/* check the type of message is image or video without text and setting corresponding message */}
                    {(msgData?.last_group_message?.type==='image' && !msgData?.last_group_message?.msg_text) && 
                        (info?.data.last_group_message?.userID===uid ? 'You sent an image' : data?.username+' sent an image')}
                    {(msgData?.last_group_message?.type==='video' && !msgData?.last_group_message?.msg_text) && 
                        (info?.data.last_group_message?.userID===uid ? 'You sent a video' : data?.username+' sent a video')}
                </p>}

            </div>  
        </Link>
    )
}

export default ChatListGroup


const LAST_MESSAGE_GROUP = gql`
    query($gcId: Int!){
        last_group_message (groupChatId: $gcId){
            msg_text
            type
            userID
        }
    }
`

const NEW_GROUP_MESSAGE = gql`
    subscription {
        newGroupMessage {
            groupChatId
            msgID
            msg_text
            userID
            url
            type
            time_sent
            username
        }
    }
`