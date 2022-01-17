import React, { useState, memo, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ChatMenu from './ChatMenu'
import Avatar from '../../General components/Avatar'
import ActivityStatus from '../../General components/ActivityStatus'

const ChatBar = () => {
    const [showMenu, setShowMenu] = useState(false)

    // passing user info from chat list user
    const {state} = useLocation()

    useEffect(()=>{
        document.querySelector('.chat-messages').addEventListener('click', ()=>setShowMenu(false))
        document.querySelector('.msg-input-box').addEventListener('click', ()=>setShowMenu(false))
        setShowMenu(false)
        return
    }, [])

    return (
        <>
            <div className='chat-bar flex-sb'>
                <div className='flex-ctr'>
                    <Link to='/chats'>
                        <i className='fas fa-arrow-left chat-back-icon'/>
                    </Link>
                    
                    <Link to={'/profile/'+state?.username} className='flex-ac'>
                        <Avatar size='45px' image={state?.profile_picture}/>
                        <span className='activity-status-chat flex-col'>
                            <p style={{marginLeft:'10px', fontSize:'15px'}}>{state?.first_name+' '+state?.last_name}</p>
                            <ActivityStatus last_seen={state?.last_seen}/>
                        </span>
                    </Link>
                </div>
                <span>
                    <i
                        className='fas fa-ellipsis-v bar-btns'
                        onClick={()=>setShowMenu(!showMenu)}
                    />
                </span>
                {showMenu && <ChatMenu/>}
            </div>
        </>
    )
}

export default memo(ChatBar)