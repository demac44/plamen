import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ChatMenu from './ChatMenu'
import Avatar from '../../General components/Avatar'

const ChatBar = ({chatID, info}) => {
    const [showMenu, setShowMenu] = useState(false)

    const handleChatMenu = () => {
        setShowMenu(!showMenu)
    }

    return (
        <>
            <div className='chat-bar flex-ac'>
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
                    <Link to={'/profile/'+info.userID} style={{height:'50px'}} className='chat-user-info'>
                        <Avatar size='50px' image={info.profile_picture}/>
                        <p>{info.first_name+' '+info.last_name}</p>
                    </Link>
                </div>
                <i 
                    className="fas fa-ellipsis-v fp-options-btn"
                    onClick={handleChatMenu}
                    style={styles.menuBtn}
                />
                {showMenu && <ChatMenu chatID={chatID}/>}
            </div>
        </>
    )
}

export default ChatBar

const styles = {
    menuBtn:{
        fontSize:'25px',
        color:'white',
        marginRight:'10px',
        cursor:'pointer'
    }
}