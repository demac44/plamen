import React, { useState, memo, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ChatMenu from './ChatMenu'
import Avatar from '../../General components/Avatar'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ActivityStatus from '../../General components/ActivityStatus'

const ChatBar = ({chatID}) => {
    const [showMenu, setShowMenu] = useState(false)

    // passing user info from chat list user
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
                        <FontAwesomeIcon icon='arrow-left' className="chat-back-icon"/>
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
                    <FontAwesomeIcon
                        icon='ellipsis-v'
                        onClick={()=>setShowMenu(!showMenu)}
                        className='bar-btns'
                        />
                </span>
                {showMenu && <ChatMenu chatID={chatID}/>}
            </div>
        </>
    )
}

export default memo(ChatBar)