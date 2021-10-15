import React from 'react'
import { NavLink } from 'react-router-dom'

const LeftNavbar = () => {
    return (
        <div className="left-navbar">
        <ul className="ln-list">
            <NavLink to="/feed"><li>Feed</li></NavLink>
            <NavLink to="#"><li>Explore</li></NavLink>
            <NavLink to="#"><li>Stories</li></NavLink>
            <NavLink to="#"><li>Live Streams</li></NavLink>
            <NavLink to="#"><li>Videos</li></NavLink>
            <NavLink to="#"><li>Groups</li></NavLink>
            <NavLink to="#"><li>Saved</li></NavLink>
            <NavLink to="#"><li>Contacts</li></NavLink>
        </ul>
    </div>
    )
}

export default LeftNavbar
