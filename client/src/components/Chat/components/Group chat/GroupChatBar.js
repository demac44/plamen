import React, { useState, memo, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Avatar from '../../../General components/Avatar'
import GroupChatMenu from './Group chat menu/GroupChatMenu'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


const GroupChatBar = ({chatID, admin}) => {
    const [showMenu, setShowMenu] = useState(false)
    const {state} = useLocation()

    const addListeners = () => {
        document.querySelector('.chat-messages').addEventListener('click', ()=>setShowMenu(false))
        document.querySelector('.msg-input-box').addEventListener('click', ()=>setShowMenu(false))
    }


    useEffect(()=>{
        addListeners()
        setShowMenu(false)
        return
    }, [chatID])

    return (
        <>
            <div className='chat-bar flex-sb'>
                <div className='flex-ctr'>
                    <Link to='/chats'>
                        <FontAwesomeIcon icon='arrow-left' className="chat-back-icon"/>
                    </Link>

                    <div className='flex-ac'>
                        <Avatar size='45px' image={state?.group_image}/>
                        <p className='cb-user-name'>{state?.name}</p>
                    </div>
                
                </div>
                <span>
                    <FontAwesomeIcon
                        icon='phone'
                        className="bar-btns"
                    />
                    <FontAwesomeIcon
                        icon='video'
                        className="bar-btns"
                    />
                    <FontAwesomeIcon
                        icon='ellipsis-v' 
                        className="bar-btns"
                        onClick={()=>setShowMenu(!showMenu)}
                        />
                </span>
                {showMenu && <GroupChatMenu chatID={chatID} admin={admin}/>}
            </div>
        </>
    )
}

export default memo(GroupChatBar)