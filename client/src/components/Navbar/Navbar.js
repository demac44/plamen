import React, { useState } from 'react'

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

    return (
        <>
            <div className="top-navbar flex-ctr">
                <div className="tn-left">
                    <Logo/>
                </div>
                <SearchBar/>
                <div className="tn-right">
                    {dropdown && <Dropdown/>}
                    <div className="tn-np-btn flex-ctr">
                        <a href="/index.html"><i className="fas fa-home"></i></a>
                        <a href="#"><i className="fas fa-plus"></i></a>
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
