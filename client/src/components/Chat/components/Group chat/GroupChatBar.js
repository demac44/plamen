import React, { useState, memo, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Avatar from '../../../General components/Avatar'
import GroupChatMenu from './Group chat menu/GroupChatMenu'

const GroupChatBar = ({chatID, admin}) => {
    const [showMenu, setShowMenu] = useState(false)

    // passing chat info from chat list
    const {state} = useLocation()

    useEffect(()=>{
        document.querySelector('.chat-messages').addEventListener('click', ()=>setShowMenu(false))
        document.querySelector('.msg-input-box').addEventListener('click', ()=>setShowMenu(false))
        setShowMenu(false)
        return
    }, [chatID])

    return (
        <>
            <div className='chat-bar flex-sb'>
                <div className='flex-ctr'>
                    <Link to='/chats'>
                        <i className='fas fa-arrow-left chat-back-icon'/>
                    </Link>

                    <div className='flex-ac'>
                        <Avatar size='45px' image={state?.group_image}/>
                        <p className='cb-user-name'>{state?.name}</p>
                    </div>
                
                </div>
                <i className='fas fa-ellipsis-v bar-btns' onClick={()=>setShowMenu(!showMenu)}/>
                {showMenu && <GroupChatMenu chatID={chatID} admin={admin}/>}
            </div>
        </>
    )
}

export default memo(GroupChatBar)