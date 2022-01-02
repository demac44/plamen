import React from 'react'
import SetTime from '../../../General components/SetTime'

const MsgOtherUser = ({setOpenMedia, storyUrl, msg}) => {
    return (
        <div className='msg-wrapper-ou flex-col'>

            {msg.type==='story-image' && 
                <div className='flex-col-ctr story-msg-box'>
                    <p>{msg.username+' replied to your story:'}</p>
                    <img className='story-message-image' src={storyUrl} alt=''/>
                </div>
            }           

            <div className='msg-inner-wrapper-ou flex-ac'>

                <div className='msg msg-other-user'>

                    {msg.type==='image' && <img className='message-image' onClick={()=>setOpenMedia(true)} src={msg.url} alt=''/>}
                    {msg.type==='video' && <video className='message-video' onClick={()=>setOpenMedia(true)} src={msg.url} controls/>}

                    {msg.msg_text.slice(0,8)==='https://' ? 
                        <a href={msg.msg_text} target='_blank' rel="noreferrer">{msg.msg_text}</a> : 
                        <p><strong>{msg?.username+' '}</strong>{msg.msg_text}</p>
                    }      

                    <span><SetTime timestamp={msg.time_sent} fontSize='12px'/></span>
                </div>
            </div>
        </div>
    )
}

export default MsgOtherUser
