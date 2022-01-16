import React from 'react'
import SetTime from '../../../General components/SetTime'
import Linkify from 'react-linkify'
import {Link} from 'react-router-dom'

const MsgOtherUser = ({setOpenMedia, storyUrl, msg}) => {
    return (
        <div className='msg-wrapper-ou flex-col'>

            {/* story reply message */}
            {msg?.type==='story-image' && 
                <div className='flex-col-ctr story-msg-box'>
                    <p>{msg.username+' replied to your story:'}</p>
                    <img className='story-message-image' src={storyUrl} alt=''/>
                </div>
            }           

            <div className='msg-inner-wrapper-ou flex-ac'>

                <div className='msg msg-other-user'>

                    {/* message type */}
                    {msg.type==='image' && <img className='message-image' onClick={()=>setOpenMedia(true)} src={msg.url} alt=''/>}
                    {msg.type==='video' && <video className='message-video' onClick={()=>setOpenMedia(true)} src={msg.url} controls/>}

                    <p><Link className='msg_username' to={'/profile/'+msg.sender}>{msg?.sender+' '}</Link><Linkify>{msg.msg_text}</Linkify></p>

                    <span><SetTime timestamp={msg.time_sent} fontSize='12px'/></span>
                </div>
            </div>
        </div>
    )
}

export default MsgOtherUser
