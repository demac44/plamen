import React, { useState, useCallback, useEffect } from 'react'

import '../../App.css'
import '../../General.css'
import Avatar from '../UI/Avatar'
import Logo from '../UI/Logo'
import Dropdown from './Dropdown'
import SearchBar from './SearchBar'

import {Link} from 'react-router-dom'

const Navbar = ({callback, isLogged}) => {
    let ls = JSON.parse(localStorage.getItem('user')) 
    const [dropdown, setDropdown] = useState(false)
    const [leftnav, setLeftNav] = useState(false)

    const handleDropdown = () => {
        setDropdown(!dropdown)
    }

    useEffect(()=>{
        callback(leftnav)
        closeDropdown()
    }, [callback, leftnav])
    
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
                    <Link to='/chats'>
                        <i className="fas fa-inbox" style={styles.inboxBtn}></i>
                    </Link>
                    <div style={styles.avatar} onClick={handleDropdown}> 
                        <Avatar height='100%' width='50px' pfp={ls.profile_picture}/>
                    </div>
                    {dropdown && <Dropdown cbDropdown={callbackDropdown}/>}
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
    }
}