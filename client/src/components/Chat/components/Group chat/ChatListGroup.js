import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../../General components/Avatar'

const ChatListGroup = ({data}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    // const newMsg = useSubscription(NEW_MESSAGE)
    const [count, setCount] = useState(0)
    const [msgData, setMsgData] = useState([])

    useEffect(()=>{
        return
    }, [])
    
    return (
        <Link to={{pathname:'/chat/group/'+data?.groupChatId, 
                state:{
                    name: data?.name,
                    group_image: data?.group_image,
                    isGroupChat: true
                }}}     
                className='chat-user-box flex-h'>
            <Avatar size='50px' image={data?.group_image}/>
            <div className='chat-name-msg flex-col-sb'>  
                <p style={{color:'white'}}>{data.name}</p>
           
                {/* {!info.loading &&
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
                </p>} */}

            </div>  
            {/* {(count > 0 || (newMsg?.data?.newMessage?.userID!==ls.userID
                && newMsg?.data?.newMessage?.chatID===data?.chatID))
                && <div style={styles.count}></div>} */}

        </Link>
    )
}

export default ChatListGroup
