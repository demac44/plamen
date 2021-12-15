import React from 'react'
import { NavLink } from 'react-router-dom'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const Sidebar = ({show}) => {

    return (
        <div className="sidebar" style={{transform: show && 'translate(0)', transition:'ease .3s'}}>
            <ul className="ln-list">
                <NavLink exact to="/feed"><li>
                    <FontAwesomeIcon icon='newspaper' color='darkgreen' fixedWidth />
                    <p>Feed</p>
                </li></NavLink>
                <NavLink exact to='/explore'><li>
                    <FontAwesomeIcon icon='compass' color='#9933ff' fixedWidth/>
                    <p>Explore</p>
                </li></NavLink>
                <NavLink exact to='/saved'><li>
                    <FontAwesomeIcon icon='bookmark' color='#ffbb00' fixedWidth/>
                    <p>Saved</p>
                </li></NavLink>
                <NavLink exact to='/communities'><li>
                    <FontAwesomeIcon icon='users' color='teal' fixedWidth/>
                    <p>Communities</p>
                </li></NavLink>
                <NavLink exact to='/someapptube'><li>
                    <FontAwesomeIcon icon='play' color='darkred' fixedWidth/>
                    <p>SomeAppTube</p>
                </li></NavLink>
            </ul>
        </div>
    )
}

export default Sidebar
