import React, { useState } from 'react'
import SetTime from '../../../General components/SetTime'

import { gql } from 'graphql-tag'
import { useMutation } from 'react-apollo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const MsgCurrentUser = ({setOpenMedia, storyUrl, msg, uid}) => {
    const [msgOptions, setMsgOptions] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [delete_msg] = useMutation(DELETE_MESSAGE, {
        variables:{msgID: msg.msgID}
    })


    const handleDelete = () => {
        delete_msg().then(()=>{setDeleted(true)})
    }  

    return (
        <div className='msg-wrapper-cu flex-col' onDoubleClick={()=>setMsgOptions(!msgOptions)}>

            {msg.type==='story-image' && 
                <div className='flex-col-ctr story-msg-box'>
                    <p>You replied to story:</p>
                    <img className='story-message-image' src={storyUrl} alt=''/>
                </div>
            }

            <div className='msg-inner-wrapper-cu flex-ac'>
                {(msg.userID===uid && msgOptions && !deleted) && 
                    <>
                        <FontAwesomeIcon
                            icon='trash-alt' 
                            className='del-msg-btn'
                            onClick={handleDelete}
                            />
                    </>
                }

                <div className='msg msg-current-user' style={{backgroundColor: deleted && 'gray'}}>
                    {deleted ? 'This message is deleted!' :
                    <>
                        {/* media message */}
                        {msg.type==='image' && <img className='message-image' onClick={()=>setOpenMedia(true)} src={msg.url} alt=''/>}
                        {msg.type==='video' && <video className='message-video' onClick={()=>setOpenMedia(true)} src={msg.url} controls/>}
                            
                        <p>{msg.msg_text.slice(0,8)==='https://' ? 
                            <a href={msg.msg_text} target='_blank' className='link-msg' rel="noreferrer">{msg.msg_text}</a> : msg.msg_text}</p>  

                        <span className='msg-timestamp'>
                            <SetTime timestamp={msg.time_sent} fontSize='12px'/>
                        </span>
                    </>}
                </div>
            </div>
        </div>
    )
}

export default MsgCurrentUser


const DELETE_MESSAGE = gql`
    mutation ($msgID: Int!){
        delete_message(msgID:$msgID){
            msgID
        }
    }
`