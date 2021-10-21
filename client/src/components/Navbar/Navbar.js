import React, { useState, useCallback } from 'react'
import { NavLink } from 'react-router-dom'

import '../../App.css'
import '../../General.css'
import Avatar from '../UI/Avatar'
import Logo from '../UI/Logo'
import Dropdown from './Dropdown'
import SearchBar from './SearchBar'

const Navbar = () => {
    let ls = JSON.parse(localStorage.getItem('user')) 
    const [dropdown, setDropdown] = useState(false)

    const handleDropdown = () => {
        setDropdown(!dropdown)
    }

    const callbackDropdown = useCallback(val => {
        setDropdown(val)
    }, [setDropdown])

    return (
        <>
            <div className="top-navbar flex-ctr">
                <div className="tn-left">
                    <Logo/>
                </div>
                <SearchBar/>
                <div className="tn-right">
                    {dropdown && <Dropdown cbDropdown={callbackDropdown}/>}
                    <div className="tn-np-btn flex-ctr">
                        <NavLink exact to="/feed"><i className="fas fa-home"></i></NavLink>
                    </div>
                    <div style={{height:'100%'}} onClick={handleDropdown}>
                        <Avatar height='100%' pfp={ls.profile_picture}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
