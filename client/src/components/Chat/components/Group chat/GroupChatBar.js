import React, { useState, memo, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Avatar from '../../../General components/Avatar'
import GroupChatMenu from './GroupChatMenu'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


const GroupChatBar = ({chatID, admin}) => {
    const [showMenu, setShowMenu] = useState(false)
    const {state} = useLocation()


    useEffect(()=>{
        setShowMenu(false)
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

                    <div style={{height:'50px'}} className='flex-h'>
                        <Avatar size='45px' image={state?.group_image}/>
                        <p style={{color:'white', marginLeft:'10px'}}>{state?.name}</p>
                    </div>
                
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
                {showMenu && <GroupChatMenu chatID={chatID} admin={admin}/>}
            </div>
        </>
    )
}

export default memo(GroupChatBar)



const styles = {
    menuBtn:{
        fontSize:'20px',
        color:'white',
        cursor:'pointer'
    }
}