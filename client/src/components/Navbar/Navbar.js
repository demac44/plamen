import React, { useState, useCallback, useEffect } from 'react'

import '../../App.css'
import '../../General.css'
import Avatar from '../UI/Avatar'
import Logo from '../UI/Logo'
import Dropdown from './Dropdown'
import SearchBar from './SearchBar'

import {Link} from 'react-router-dom'


import { useSubscription, useQuery } from 'react-apollo'
import { gql } from 'graphql-tag'
import NotficationsMenu from './NotficationsMenu'

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

const Navbar = ({callback, isLogged}) => {
    const ls = JSON.parse(localStorage.getItem('user')) 
    const [dropdown, setDropdown] = useState(false)
    const [notifications, setNotificiations] = useState(true)
    const [leftnav, setLeftNav] = useState(false)
    const {data} = useSubscription(NEW_MESSAGE)
    const [NotNo, setNotNo] = useState(0)
    const count = useQuery(COUNT_MSGS, {
        variables:{rid: ls.userID}
    })

    const handleDropdown = () => {
        setDropdown(!dropdown)
    }

    useEffect(()=>{
        setNotNo(!count.loading && count?.data?.count_newMsgs?.msgCount)
        callback(leftnav)
        closeDropdown()
        if(count){
            count?.refetch()
        }
    }, [callback, leftnav, count.data, data]) 
    
    const callbackDropdown = useCallback(val => {
        setDropdown(val)
    }, [setDropdown])

    const closeDropdown = () => {
        document.querySelector('.wrapper').addEventListener('click', () => setDropdown(false))
        return
    }
    
    return (
        <>
            <div className="top-navbar">
                <div className='tn-menu-btn'>
                    <i className="fas fa-bars" onClick={()=>setLeftNav(!leftnav)}></i>
                </div>
                <div className="tn-left">
                    <Logo/>
                </div>
                <SearchBar chat={false} isLogged={isLogged}/>
                <div className="tn-right">
                {isLogged ?
                <>
                    <i style={{...styles.inboxBtn, marginTop:'-13px'}} 
                        onClick={()=>setNotificiations(!notifications)} 
                        className="fas fa-sort-down"></i>
                    <Link to='/chats' style={{position:'relative'}}>
                        {(!count.loading && (count?.data?.count_newMsgs?.msgCount > 0 && 
                        <div className='flex-ctr' style={styles.count}>{NotNo}</div>))}
                        <i className="fas fa-inbox" style={styles.inboxBtn}></i>
                    </Link>
                    <div style={styles.avatar} onClick={handleDropdown}> 
                        <Avatar height='100%' width='50px' pfp={ls.profile_picture}/>
                    </div>
                    {dropdown && <Dropdown cbDropdown={callbackDropdown}/>}
                    <NotficationsMenu visible={notifications ? 'visible' : 'hidden'}/>
                </>
                    : <Link to='/login'><button style={styles.loginBtn} className='btn'>LOGIN</button></Link>}
                </div>
            </div>
        </>
    )
}

export default Navbar


const styles = {
    inboxBtn: {
        fontSize: '30px',
        color:'white',
        marginRight: '25px',
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