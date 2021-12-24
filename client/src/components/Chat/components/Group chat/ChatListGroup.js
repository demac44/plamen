import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../../General components/Avatar'

import {gql} from 'graphql-tag'
import { useQuery, useSubscription } from 'react-apollo'

const ChatListGroup = ({data}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const newMsg = useSubscription(NEW_GROUP_MESSAGE)
    // const [count, setCount] = useState(0)
    const [msgData, setMsgData] = useState([])
    const info = useQuery(LAST_MESSAGE_GROUP, {
        variables:{
            gcId: data?.groupChatId
        }
    })

    useEffect(()=>{
        // setCount(info?.data?.count_msgs?.msgCount)
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
                className='chat-user-box flex-h'>
            <Avatar size='45px' image={data?.group_image}/>
            <div className='chat-name-msg flex-col-sb'>  
                <p style={{color:'white'}}>{data.name}</p>
           
                {!info.loading &&
                <p style={{fontSize:'12px', 
                            color:info?.data?.last_group_message?.userID===ls.userID ? 'gray' : 'white', 
                            fontWeight: info?.data?.last_group_message?.userID===ls.userID ? 'lighter' : 'bold'}}>

                    {(newMsg && newMsg?.data && newMsg?.data?.newGroupMessage?.groupChatId===data?.groupChatId) ? 
                        (newMsg?.data?.newGroupMessage?.msg_text.length>25 ? newMsg?.data?.newGroupMessage?.msg_text.slice(0,22)+'...' 
                            : newMsg?.data?.newGroupMessage?.msg_text)
                        : (msgData?.last_group_message?.msg_text.length>25 ? msgData?.last_group_message?.msg_text.slice(0,22)+'...' 
                            : msgData?.last_group_message?.msg_text)}

                    {(msgData?.last_group_message?.type==='image' && !msgData?.last_group_message?.msg_text) && 
                        (info?.data.last_group_message?.userID===ls.userID ? 'You sent an image' : data?.username+' sent an image')}
                    {(msgData?.last_group_message?.type==='video' && !msgData?.last_group_message?.msg_text) && 
                        (info?.data.last_group_message?.userID===ls.userID ? 'You sent a video' : data?.username+' sent a video')}
                </p>}

            </div>  
            {/* {(count > 0 || (newMsg?.data?.newGroupMessage?.userID!==ls.userID
                && newMsg?.data?.newGroupMessage?.groupChatId===data?.groupChatId))
                && <div style={styles.count}></div>} */}

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

// const styles = {
//     count:{
//         backgroundColor:'white',
//         color:'white',
//         padding:'6px',
//         position:'absolute',
//         top:'25px',
//         right:'20px',
//         borderRadius:'50%',
//     }
// }
