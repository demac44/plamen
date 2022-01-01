import React from 'react'
import { NavLink } from 'react-router-dom'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import logoTube from '../../images/logo-red-min.png'
import logoStream from '../../images/logo-green-min.png'

const Sidebar = () => {

    return (
        <div className="sidebar">
            <div className="ln-list">
                <NavLink exact to="/" activeClassName='nav-active'>
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
                <NavLink exact to='/plamentube' activeClassName='nav-active'>
                    <img src={logoTube} alt=''/>
                    <p>plamenTube</p>
                </NavLink>
                <NavLink exact to='/plamenstream' activeClassName='nav-active'>
                    <img src={logoStream} alt=''/>
                    <p>plamenStream</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar