import React, { useState, useEffect, memo, useCallback } from 'react'

import '../../App.css'
import '../../General.css'
import './Navbar.css'

import Logo from '../General components/Logo'
import Dropdown from './Dropdown'
import SearchBar from './SearchBar'

import Avatar from '../General components/Avatar'
import { useSelector } from 'react-redux';

import {Link} from 'react-router-dom'


import { useSubscription, useQuery } from 'react-apollo'
import { gql } from 'graphql-tag'
import NotficationsMenu from './NotficationsMenu'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const Navbar = ({isLogged}) => {
    const ls = JSON.parse(localStorage.getItem('user')) 
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [dropdown, setDropdown] = useState(false)
    const [notifications, setNotificiations] = useState(false)
    const {data} = useSubscription(NEW_MESSAGE)
    const [NotNo, setNotNo] = useState(0)
    const count = useQuery(COUNT_MSGS, {
        variables:{rid: uid}
    })

    const handleDropdown = () => {
        setDropdown(!dropdown)
        setNotificiations(false)
    }

    useEffect(()=>{
        isLogged && setNotNo(!count.loading && count?.data?.count_newMsgs?.msgCount)
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
                    <FontAwesomeIcon icon='sort-down' style={{...styles.inboxBtn, marginTop:'-13px'}} 
                        onClick={()=>{setNotificiations(!notifications);setDropdown(false)}}/>
                    <Link to='/chats' style={{position:'relative'}}>
                        {(!count.loading && (count?.data?.count_newMsgs?.msgCount > 0 && 
                        <div className='flex-ctr' style={styles.count}>{NotNo}</div>))}
                        <FontAwesomeIcon icon='inbox' style={styles.inboxBtn}/>
                    </Link>
                    <div className='flex-ac' style={styles.avatar} onClick={handleDropdown}> 
                        <Avatar size='45px' image={ls.profile_picture}/>
                    </div>
                    {dropdown && <Dropdown closeDropd={closeDropd}/>}
                    <NotficationsMenu visible={notifications ? 'visible' : 'hidden'}/>
                </>
                    : <Link to='/login'><button style={styles.loginBtn} className='btn'>LOGIN</button></Link>}
                </div>
            </div>
        </>
    )
}

export default memo(Navbar)


const styles = {
    inboxBtn: {
        fontSize: '25px',
        color:'white',
        marginRight: '20px',
        cursor:'pointer'
    },
    avatar: {
        height:'100%',
    },
    loginBtn: {
        backgroundColor:'#ffbb00',
        padding:'10px 20px',
        color:'#1f1f1f',
        fontSize:'16px',
        fontWeight:'bold'
    },
    count:{
        backgroundColor:'red',
        color:'white',
        width:'20px',
        height:'20px',
        position:'absolute',
        top:'-5px',
        right:'15px',
        borderRadius:'50%',
        fontSize:'13px'
    }
}

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