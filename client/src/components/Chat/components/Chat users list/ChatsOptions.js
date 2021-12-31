import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CreateGroupChatBox from '../Group chat/CreateGroupChatBox'
import './style.css'

const ChatsOptions = () => {
    const [nameBox, setNameBox] = useState(false)
    return (
        <div className='chats-options flex-col'>
            <div className='chats-options-bar flex-ac'>
                <span className='flex-ctr new-chat-btn' onClick={()=>setNameBox(!nameBox)}>
                    <FontAwesomeIcon
                        style={{transform: nameBox ? 'rotate(45deg)' : 'rotate(0)', transition:'ease .3s'}} 
                        icon='plus' 
                    />
                </span>
                <FontAwesomeIcon icon='ellipsis-v' size='lg' color='white'/>
            </div>
            {nameBox && <CreateGroupChatBox/>}
        </div>
    )
}
export default ChatsOptions
