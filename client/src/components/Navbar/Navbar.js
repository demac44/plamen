import React, { useState, useEffect, memo, useCallback } from 'react'
import './Navbar.css'
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { useQuery } from 'react-apollo'
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
    // count all unread messages
    const count = useQuery(COUNT_MSGS, {
        variables:{receiver: usernm}
    })

    const handleDropdown = () => {
        setDropdown(!dropdown)
        setNotificiations(false)
    }

    useEffect(()=>{
        closeDropdown()
    }, []) 

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
                        {count?.data?.count_newMsgs?.msgCount > 0 && 
                        <div className='flex-ctr tn-msgs-count'>{count?.data?.count_newMsgs?.msgCount}</div>}
                        <i className='fas fa-inbox tn-icons'/>
                    </Link>

                    <div onClick={handleDropdown}> 
                        <Avatar size='45px' image={ls.profile_picture}/>
                    </div>

                    {dropdown && <Dropdown closeDropd={closeDropd}/>}
                    
                    <NotficationsMenu visible={notifications ? 'visible' : 'hidden'}/>
                </div>
            </div>
        </>
    )
}

export default memo(Navbar)

const NEW_MESSAGE = gql`
    subscription {
        newMsgNotification {
            sender
            receiver
            Nid
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