import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = ({show}) => {

    return (
        <div className="sidebar" style={{transform: show && 'translate(0)', transition:'ease .3s'}}>
            <ul className="ln-list">
                <NavLink exact to="/feed"><li>
                    <i style={{color:'darkgreen'}} className="fas fa-newspaper"></i>
                    <p>Feed</p>
                </li></NavLink>
                <NavLink exact to='/explore'><li>
                    <i style={{color:'#9933ff'}} class="fas fa-compass"></i>
                    <p>Explore</p>
                </li></NavLink>
                <NavLink exact to='/saved'><li>
                    <i style={{color:'#ffbb00'}} className="fas fa-bookmark"></i>
                    <p>Saved</p>
                </li></NavLink>
                <NavLink exact to='/communities'><li>
                    <i style={{color:'teal'}} className="fas fa-users"></i>
                    <p>Communities</p>
                </li></NavLink>
                <NavLink exact to='/someapptube'><li>
                    <i style={{color:'darkred'}} className="fas fa-play"></i>
                    <p>SomeAppTube</p>
                </li></NavLink>
            </ul>
        </div>
    )
}

export default Sidebar
