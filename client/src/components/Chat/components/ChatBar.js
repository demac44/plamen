import React, { useState } from 'react'
import Avatar from '../../UI/Avatar'
import ChatMenu from './Functional components/ChatMenu'

const ChatBar = ({chatid, info}) => {
    const [showMenu, setShowMenu] = useState(false)

    const handleChatMenu = () => {
        setShowMenu(!showMenu)
    }

    return (
        <>
            <div className='chat-bar'>
                <div className='chat-user-info'>
                    <Avatar height='100%' width='50px' pfp={info.profile_picture}/>
                    <p>{info.first_name+' '+info.last_name}</p>
                </div>
                <i 
                className="fas fa-ellipsis-v fp-options-btn"
                onClick={handleChatMenu}
                ></i>
                {showMenu && <ChatMenu chatid={chatid}/>}
            </div>
        </>
    )
}

export default ChatBar
