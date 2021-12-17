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
                    <Link to={'/profile/'+state?.username} style={{height:'50px'}} className='flex-h'>
                        <Avatar size='50px' image={state?.profile_picture}/>
                        <p style={{color:'white', marginLeft:'10px'}}>{state?.first_name+' '+state?.last_name}</p>
                    </Link>
                </div>
                <FontAwesomeIcon
                    icon='ellipsis-v' 
                    className="fp-options-btn"
                    onClick={handleChatMenu}
                    style={styles.menuBtn}
                />
                {showMenu && <ChatMenu chatID={chatID}/>}
            </div>
        </>
    )
}

export default memo(ChatBar)

const styles = {
    menuBtn:{
        fontSize:'25px',
        color:'white',
        marginRight:'10px',
        cursor:'pointer'
    }
}