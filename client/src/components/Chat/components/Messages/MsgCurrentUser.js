import React, { useState } from 'react'
import SetTime from '../../../General components/SetTime'
import { useMutation } from 'react-apollo'
import Linkify from 'react-linkify'


const MsgCurrentUser = ({setOpenMedia, storyUrl, msg, uid, deleteQuery}) => {
    const [msgOptions, setMsgOptions] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [delete_msg] = useMutation(deleteQuery)


    const handleDelete = () => {
        delete_msg({
            variables:{
                msgID: msg.msgID
            }
        }).then(()=>{setDeleted(true)})
    }  

    return (
        <div className='msg-wrapper-cu flex-col' onDoubleClick={()=>setMsgOptions(!msgOptions)}>

            {/* story reply message*/}
            {msg.type==='story-image' && 
                <div className='flex-col-ctr story-msg-box'>
                    <p>You replied to story:</p>
                    <img className='story-message-image' src={storyUrl} alt=''/>
                </div>
            }

            {/* delete icon */}
            <div className='msg-inner-wrapper-cu flex-ac'>
                {(msg.userID===uid && msgOptions && !deleted) && <i className='fas fa-trash-alt del-msg-btn' onClick={handleDelete}/>}

                <div className='msg msg-current-user' style={{backgroundColor: deleted && 'gray'}}>
                    {deleted ? 'This message is deleted!' :
                    <>
                        {/* message type */}
                        {msg.type==='image' && <img className='message-image' onClick={()=>setOpenMedia(true)} src={msg.url} alt=''/>}
                        {msg.type==='video' && <video className='message-video' onClick={()=>setOpenMedia(true)} src={msg.url} controls/>}
                            
                        <Linkify><p>{msg.msg_text}</p></Linkify>

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