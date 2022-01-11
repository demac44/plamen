import React, { useState, useEffect, memo, useCallback } from 'react'
import './Navbar.css'
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { useSubscription, useQuery } from 'react-apollo'
import { gql } from 'graphql-tag'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Logo from '../General components/Logo'
import Dropdown from './Dropdown'
import SearchBar from './Search bar/SearchBar'
import Avatar from '../General components/Avatar'
import NotficationsMenu from './Notifications/NotficationsMenu'

const Navbar = ({isLogged}) => {
    const ls = JSON.parse(localStorage.getItem('user')) 
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [dropdown, setDropdown] = useState(false)
    const [notifications, setNotificiations] = useState(false)
    const {data} = useSubscription(NEW_MESSAGE)
    // count all unread messages
    const [NoOfMsgs, setNoOfMsgs] = useState(0)
    const count = useQuery(COUNT_MSGS, {
        variables:{rid: uid}
    })

    const handleDropdown = () => {
        setDropdown(!dropdown)
        setNotificiations(false)
    }

    useEffect(()=>{
        isLogged && setNoOfMsgs(!count.loading && count?.data?.count_newMsgs?.msgCount)
        closeDropdown()
        return
    }, [count, data, isLogged]) 

    const closeDropdown = () => {
        document.querySelector('.wrapper').addEventListener('click', () => {
            setNotificiations(false)
            setDropdown(false)})
        return
    }

    const handleSearchOpen = useCallback(()=>{
        setDropdown(false)
        setNotificiations(false)
    }, [])
    
    const closeDropd = () => {
        setDropdown(false)
        return
    }
    return (
        <>
            <div className="top-navbar">
                <div className="tn-left">
                    <Logo/>
                </div>
                <SearchBar chat={false} isLogged={isLogged} handleOpen={handleSearchOpen} />
                <div className="tn-right">
                {isLogged ?
                <>
                    <FontAwesomeIcon icon='sort-down' className='tn-icons' style={{marginTop:'-13px'}} 
                        onClick={()=>{setNotificiations(!notifications);setDropdown(false)}}/>

                    <Link to='/chats' style={{position:'relative'}}>
                        {(!count.loading && (count?.data?.count_newMsgs?.msgCount > 0 && 
                        <div className='flex-ctr tn-msgs-count'>{NoOfMsgs}</div>))}
                        <FontAwesomeIcon icon='inbox' className='tn-icons'/>
                    </Link>

                    <div onClick={handleDropdown}> 
                        <Avatar size='45px' image={ls.profile_picture}/>
                    </div>

                    {dropdown && <Dropdown closeDropd={closeDropd}/>}
                    
                    <NotficationsMenu visible={notifications ? 'visible' : 'hidden'}/>
                </>
                    : <Link to='/login'><button className='btn navbar-login-btn'>LOGIN</button></Link>}
                </div>
            </div>
        </>
    )
}

export default memo(Navbar)

const NEW_MESSAGE = gql`
    subscription {
        newMsgNotification {
            chatID
            sender_id
            receiver_id
            Nid
        }
    }
`

const COUNT_MSGS = gql`
    query($rid:Int!){
        count_newMsgs(receiver_id: $rid){
            msgCount 
        }
    }
`