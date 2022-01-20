import React, { useState, useEffect, memo, useCallback } from 'react'
import './Navbar.css'
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { useQuery, useSubscription } from 'react-apollo'
import { gql } from 'graphql-tag'
import Logo from '../General components/Logo'
import Dropdown from './Dropdown'
import SearchBar from './Search bar/SearchBar'
import Avatar from '../General components/Avatar'
import NotficationsMenu from './Notifications/NotficationsMenu'

const Navbar = () => {
    const ls = JSON.parse(localStorage.getItem('user')) 
    const usernm = useSelector(state => state?.isAuth?.user?.username)
    const [dropdown, setDropdown] = useState(false)
    const [notifications, setNotificiations] = useState(false)
    const newMsg = useSubscription(NEW_MESSAGE)
    const newMsgNotif = useSubscription(NEW_MESSAGE_NOTIF)
    const [msgNotifCount, setMsgNotifCount] = useState(null)
    // count all unread messages
    const count = useQuery(COUNT_MSGS, {
        variables:{receiver: usernm}
    })

    const handleDropdown = () => {
        setDropdown(!dropdown)
        setNotificiations(false)
    }

    useEffect(()=>{
        setMsgNotifCount(count?.data?.count_newMsgs?.msgCount)
        closeDropdown()
        if(newMsgNotif?.data?.newMsgNotification){
            newMsgNotif?.data?.newMsgNotification?.receiver===usernm && setMsgNotifCount(count?.data?.count_newMsgs?.msgCount+1)
        }
    }, [newMsgNotif, count, newMsg?.data?.newMessage?.msg_text, usernm]) 

    const closeDropdown = () => {
        document.querySelector('.wrapper').addEventListener('click', () => {
            setNotificiations(false)
            setDropdown(false)})
        return null
    }

    const handleSearchOpen = useCallback(()=>{
        setDropdown(false)
        setNotificiations(false)
    }, [])
    
    const closeDropd = () => {
        setDropdown(false)
        return null
    }
    return (
        <>
            <div className="top-navbar">
                <div className="tn-left">
                    <Logo/>
                </div>
                <SearchBar chat={false} handleOpen={handleSearchOpen} />
                <div className="tn-right">
                    <i className='fas fa-sort-down tn-icons' style={{marginTop:'-13px'}} 
                        onClick={()=>{setNotificiations(!notifications);setDropdown(false)}}/>

                    <Link to='/chats' style={{position:'relative'}}>
                        {msgNotifCount > 0 && 
                        <div className='flex-ctr tn-msgs-count'>{msgNotifCount}</div>}
                        <i className='fas fa-inbox tn-icons'/>
                    </Link>

                    <div onClick={handleDropdown}> 
                        <Avatar size='45px' image={ls.profile_picture}/>
                    </div>

                    {dropdown && <Dropdown closeDropd={closeDropd}/>}
                    
                    <NotficationsMenu visible={notifications ? 'visible' : 'hidden'}/>

                    {/* {(newMsg?.data?.newMessage) && 
                    <div className='drop-down-msg flex-ctr' >
                        <Avatar size="50px" image={newMsg?.data?.newMessage?.profile_picture}/>
                        <span className='flex-col'>
                            <p><strong>{newMsg?.data?.newMessage?.sender}</strong></p>
                            <p>{newMsg?.data?.newMessage?.msg_text}</p>
                        </span>
                    </div>} */}
                </div>
            </div>
        </>
    )
}

export default memo(Navbar)

const NEW_MESSAGE_NOTIF = gql`
    subscription {
        newMsgNotification {
            sender
            receiver
            Nid
        }
    }
`
const NEW_MESSAGE = gql`
subscription{
    newMessage {
        msgID
        msg_text
        url
        type
        time_sent
        profile_picture
        storyID
        sender
        receiver
    }
}
`


const COUNT_MSGS = gql`
    query($receiver: String!){
        count_newMsgs(receiver: $receiver){
            msgCount 
        }
    }
`