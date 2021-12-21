import React, { useState, memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ChatMenu from './ChatMenu'
import Avatar from '../../General components/Avatar'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const ChatBar = ({chatID}) => {
    const [showMenu, setShowMenu] = useState(false)
    const {state} = useLocation()



    const handleChatMenu = () => {
        setShowMenu(!showMenu)
    }

    return (
        <>
            <div className='chat-bar flex-sb'>
                <div className='flex-ctr'>
                    <Link to='/chats'>
                        <FontAwesomeIcon icon='arrow-left' className="chat-back-icon"
                            style={{
                                marginRight:'15px',
                                marginLeft:'5px',
                                fontSize:'25px',
                                color:'white'
                            }}
                        />
                    </Link>
                    
                    {state?.isGroupChat 
                    ?   <div style={{height:'50px'}} className='flex-h'>
                            <Avatar size='50px' image={state?.group_image}/>
                            <p style={{color:'white', marginLeft:'10px'}}>{state?.name}</p>
                        </div>
                    
                    :   <Link to={'/profile/'+state?.username} style={{height:'50px'}} className='flex-h'>
                            <Avatar size='50px' image={state?.profile_picture}/>
                            <p style={{color:'white', marginLeft:'10px'}}>{state?.first_name+' '+state?.last_name}</p>
                        </Link>}
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
                        onClick={handleChatMenu}
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