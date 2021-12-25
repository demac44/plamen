import React, { useState, memo, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ChatMenu from './ChatMenu'
import Avatar from '../../General components/Avatar'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import ActivityStatus from '../../General components/ActivityStatus'

const ChatBar = ({chatID}) => {
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
                        <FontAwesomeIcon icon='arrow-left' className="chat-back-icon"
                            style={{
                                marginRight:'15px',
                                marginLeft:'5px',
                                fontSize:'20px',
                                color:'white'
                            }}
                        />
                    </Link>
                    
                    <Link to={'/profile/'+state?.username} style={{height:'50px'}} className='flex-h'>
                        <Avatar size='45px' image={state?.profile_picture}/>
                        <span className='activity-status-chat flex-col'>
                            <p style={{color:'white', marginLeft:'10px'}}>{state?.first_name+' '+state?.last_name}</p>
                            <ActivityStatus last_seen={state?.last_seen}/>
                        </span>
                    </Link>
                </div>
                <span>
                    <FontAwesomeIcon
                        icon='phone'
                        style={{...styles.menuBtn, marginRight:'30px'}}
                    />
                    <FontAwesomeIcon
                        icon='video'
                        style={{...styles.menuBtn, marginRight:'30px'}}
                    />
                    <FontAwesomeIcon
                        icon='ellipsis-v'
                        className="fp-options-btn"
                        onClick={()=>setShowMenu(!showMenu)}
                        style={{...styles.menuBtn, marginRight:'15px'}}
                        />
                </span>
                {showMenu && <ChatMenu chatID={chatID}/>}
            </div>
        </>
    )
}

export default memo(ChatBar)

const styles = {
    menuBtn:{
        fontSize:'20px',
        color:'white',
        cursor:'pointer'
    }
}