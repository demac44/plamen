import React from 'react'
import { NavLink } from 'react-router-dom'

const LeftNavbar = ({show}) => {

    return (
        <div className="left-navbar" style={{transform: show && 'translate(0)', transition:'ease .3s'}}>
            <ul className="ln-list">
                <NavLink exact to="/feed"><li>
                    <i style={{color:'darkgreen'}} class="fas fa-newspaper"></i>
                    <p>Feed</p>
                </li></NavLink>
                <NavLink exact to='/saved'><li>
                    <i style={{color:'#ffbb00'}} class="fas fa-bookmark"></i>
                    <p>Saved</p>
                </li></NavLink>
                <NavLink exact to='/communities'><li>
                    <i style={{color:'teal'}} class="fas fa-users"></i>
                    <p>Communities</p>
                </li></NavLink>
                <NavLink exact to='/someapptube'><li>
                    <i style={{color:'darkred'}} class="fas fa-play"></i>
                    <p>SomeAppTube</p>
                </li></NavLink>
            </ul>
        </div>
    )
}

export default LeftNavbar
