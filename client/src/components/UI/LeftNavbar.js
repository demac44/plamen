import React from 'react'
import { NavLink } from 'react-router-dom'

const LeftNavbar = () => {
    return (
        <div className="left-navbar">
            <ul className="ln-list">
                <NavLink exact to="/feed"><li>Feed</li></NavLink>
                <NavLink exact to='/saved'><li>Saved</li></NavLink>
            </ul>
        </div>
    )
}

export default LeftNavbar
