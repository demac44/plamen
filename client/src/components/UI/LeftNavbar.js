import React from 'react'
import { NavLink } from 'react-router-dom'

const LeftNavbar = ({show}) => {

    return (
        <div className="left-navbar" style={{transform: show && 'translate(0)', transition:'ease .3s'}}>
            <ul className="ln-list">
                <NavLink exact to="/feed"><li>Feed</li></NavLink>
                <NavLink exact to='/saved'><li>Saved</li></NavLink>
            </ul>
        </div>
    )
}

export default LeftNavbar
