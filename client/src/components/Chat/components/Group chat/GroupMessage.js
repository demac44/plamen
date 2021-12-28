import React, { useCallback, useState, memo } from 'react'

import { gql } from 'graphql-tag'
import { useMutation } from 'react-apollo'
import OpenMedia from '../OpenMedia'
import SetTime from '../../../General components/SetTime'
import Avatar from '../../../General components/Avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux';



const GroupMessage = ({msg}) => {
    const uid = useSelector(state => state.isAuth.user?.userID)
    const [msgOptions, setMsgOptions] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [openMedia, setOpenMedia] = useState(false)
    const [delete_msg] = useMutation(DELETE_MESSAGE)
    
    
    const handleDelete = () => {
        delete_msg({
            variables:{
                msgID: msg.msgID
            }
        }).then(()=>{setDeleted(true)})
    }  

    const closeMediaCallback = useCallback(val => {
        setOpenMedia(val)
    }, [setOpenMedia])
    
    return (
        <>
            <div className={msg.userID===uid ? 'msg-wrapper-cu flex-h' : 'msg-wrapper-ou flex-h'}
                    onClick={()=>setMsgOptions(!msgOptions)}>

                {(msg.userID===uid && msgOptions && !deleted) && 
                    <>
                        <FontAwesomeIcon
                            icon='trash-alt' 
                            style={styles.deletebtn}
                            onClick={handleDelete}
                        />
                    </>
                    }
                {msg.userID!==uid && <Avatar size='35px' image={msg?.profile_picture}/>}
                {msg.userID===uid ?
                <div className='msg msg-current-user' style={{backgroundColor: deleted && 'gray'}}>
                    {deleted ? 'This message is deleted!' :
                    <>
                        {/* media message */}
                        {msg.type==='image' && <img className='message-image' onClick={()=>setOpenMedia(true)} src={msg.url} alt=''/>}
                        {msg.type==='video' && <video className='message-video' src={msg.url} controls/>}
                            
                        <p>{msg.msg_text.slice(0,8)==='https://' ? 
                            <a href={msg.msg_text} target='_blank' style={styles.link} rel="noreferrer">{msg.msg_text}</a> : msg.msg_text}</p>  

                        <span style={{...styles.timestamp, textAlign:'right'}}>
                            <SetTime timestamp={msg.time_sent} fontSize='12px'/>
                        </span>
                    </>}
                </div>
                : 
                <div className='msg msg-other-user'>
                        {msg.type==='image' && <img className='message-image' onClick={()=>setOpenMedia(true)} src={msg.url} alt=''/>}
                        {msg.type==='video' && <video className='message-video' onClick={()=>setOpenMedia(true)} src={msg.url} controls/>}

                        {msg.msg_text.slice(0,8)==='https://' ? 
                            <a href={msg.msg_text} target='_blank' rel="noreferrer">{msg.msg_text}</a> : 
                            <p><strong>{msg.username+' '}</strong>{msg.msg_text}</p>
                        }
                        
                        <span><SetTime timestamp={msg.time_sent} fontSize='12px'/></span>
                </div>}
            </div>
            {openMedia && <OpenMedia url={msg.url} callback={closeMediaCallback}/>}    
        </>
    )
}

export default memo(GroupMessage)

const DELETE_MESSAGE = gql`
    mutation ($msgID: Int!){
        delete_group_chat_message(msgID: $msgID){
            groupChatId
        }
    }
`

const styles = {
    deletebtn:{
        fontSize:'20px',
        cursor:'pointer',
        color:'#aaa',
        marginTop:'10px',
        marginRight:'10px'
    },
    link:{
        color:'white',
        textDecoration:'underline'
    },
    timestamp:{
        width:'100%'
    }
}