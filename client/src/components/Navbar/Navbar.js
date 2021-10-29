import React, { useState, useCallback, useEffect } from 'react'

import '../../App.css'
import '../../General.css'
import Avatar from '../UI/Avatar'
import Logo from '../UI/Logo'
import Dropdown from './Dropdown'
import SearchBar from './SearchBar'

const Navbar = ({callback}) => {
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
                <SearchBar/>
                <div className="tn-right">
                    {dropdown && <Dropdown cbDropdown={callbackDropdown}/>}
                    <div style={{height:'100%'}} onClick={handleDropdown}>
                        <Avatar height='100%' pfp={ls.profile_picture}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
