import React, { useState } from 'react'
import CreateGroupChatBox from '../Group chat/CreateGroupChatBox'
import './style.css'

const ChatsOptions = () => {
    const [nameBox, setNameBox] = useState(false)
    return (
        <div className='chats-options flex-col'>
            <div className='chats-options-bar flex-ac'>
                <span className='flex-ctr new-chat-btn' onClick={()=>setNameBox(!nameBox)}>
                    <i style={{transform: nameBox ? 'rotate(45deg)' : 'rotate(0)', transition:'ease .3s'}} className='fas fa-plus'/>
                </span>
                <i className='fas fa-ellipsis-v'/>
            </div>
            {nameBox && <CreateGroupChatBox/>}
        </div>
    )
}
export default ChatsOptions
