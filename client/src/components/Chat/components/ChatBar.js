import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../UI/Avatar'
import ChatMenu from '../Functional components/ChatMenu'

const ChatBar = ({chatid, info}) => {
    const [showMenu, setShowMenu] = useState(false)

    const handleChatMenu = () => {
        setShowMenu(!showMenu)
    }

    return (
        <>
            <div className='chat-bar'>
                <div className='flex-ctr'>
                    <Link to='/chats'>
                        <i className="fas fa-arrow-left chat-back-icon"
                            style={{
                                marginRight:'15px',
                                marginLeft:'5px',
                                fontSize:'25px',
                                color:'white'
                            }}
                        ></i>
                    </Link>
                    <Link to={'/profile/'+info.userID} className='chat-user-info'>
                        <Avatar height='100%' width='50px' pfp={info.profile_picture}/>
                        <p>{info.first_name+' '+info.last_name}</p>
                    </Link>
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
