import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import CreateGroupChatBox from './Group chat/CreateGroupChatBox'

const ChatsOptions = () => {
    const [nameBox, setNameBox] = useState(false)


    return (
        <div className='chats-options flex-col'>
            <div className='chats-options-bar flex-h'>
                <span style={styles.newChat} className='flex-ctr'>
                    <FontAwesomeIcon
                        style={{transform: nameBox ? 'rotate(45deg)' : 'rotate(0)', transition:'ease .3s'}} 
                        icon='plus' 
                        onClick={()=>setNameBox(!nameBox)}/>
                </span>
                <FontAwesomeIcon icon='ellipsis-v' style={styles.opt}/>
            </div>
            {nameBox && <CreateGroupChatBox/>}
        </div>
    )
}

export default ChatsOptions

const styles = {
    newChat:{
        fontSize:'20px',
        color:'white',
        backgroundColor:'#2f2f2f',
        marginRight:'15px',
        width:'40px',
        height:'40px',
        borderRadius:'50%',
        cursor:'pointer'
    },
    opt:{
        fontSize:'25px',
        color:'white',
    }
}
