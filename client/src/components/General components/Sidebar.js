import React from 'react'
import { NavLink } from 'react-router-dom'
import logoTube from '../../images/logo-red-min.jpg'
import logoStream from '../../images/logo-green-min.jpg'

const Sidebar = () => {

    return (
        <div className="sidebar">
            <div className="ln-list">
                <NavLink exact to="/" activeClassName='nav-active'>
                    <i className='fas fa-newspaper' style={{color: 'darkgreen'}} />
                    <p>Feed</p>
                </NavLink>
                <NavLink exact to='/explore' activeClassName='nav-active'>
                    <i className='fas fa-compass' style={{color: '#9933ff'}}/>
                    <p>Explore</p>
                </NavLink>
                <NavLink exact to='/saved' activeClassName='nav-active'>
                    <i className='fas fa-bookmark' style={{color: '#ffbb00'}}/>
                    <p>Saved</p>
                </NavLink>
                <NavLink exact to='/communities' activeClassName='nav-active'>
                    <i className='fas fa-users' style={{color: 'teal'}}/>
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