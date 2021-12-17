import React from 'react'
import { NavLink } from 'react-router-dom'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const Sidebar = () => {

    return (
        <div className="sidebar">
            <div className="ln-list">
                <NavLink exact to="/feed" activeClassName='nav-active'>
                    <FontAwesomeIcon icon='newspaper' color='darkgreen' fixedWidth />
                    <p>Feed</p>
                </NavLink>
                <NavLink exact to='/explore' activeClassName='nav-active'>
                    <FontAwesomeIcon icon='compass' color='#9933ff' fixedWidth/>
                    <p>Explore</p>
                </NavLink>
                <NavLink exact to='/saved' activeClassName='nav-active'>
                    <FontAwesomeIcon icon='bookmark' color='#ffbb00' fixedWidth/>
                    <p>Saved</p>
                </NavLink>
                <NavLink exact to='/communities' activeClassName='nav-active'>
                    <FontAwesomeIcon icon='users' color='teal' fixedWidth/>
                    <p>Communities</p>
                </NavLink>
                <NavLink exact to='/someapptube' activeClassName='nav-active'>
                    <FontAwesomeIcon icon='play' color='darkred' fixedWidth/>
                    <p>SomeAppTube</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar
