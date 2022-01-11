import React from 'react'
import { NavLink } from 'react-router-dom'
import logoTube from '../../images/logo-red-min.png'
import logoStream from '../../images/logo-green-min.png'

const AlternativeNavbar = ({chat}) => {
    return (
        <div className='alternative-navbar' style={chat && styles.nav}>
            <div className='flex-sa' style={{width:'100%', height:'100%'}}>
                <NavLink exact to="/">
                    <i className='fas fa-newspaper' style={{color: 'darkgreen'}}/>
                </NavLink>
                <NavLink exact to='/explore'>      
                    <i className='fas fa-compass' style={{color: '#9933ff'}}/>
                </NavLink>
                <NavLink exact to='/saved'>
                    <i className='fas fa-bookmark' style={{color: '#ffbb00'}}/>
                </NavLink>
                <NavLink exact to='/communities'>
                    <i className='fas fa-users' style={{color: 'teal'}}/>
                </NavLink>
                <NavLink exact to='/plamentube'>
                    <img src={logoTube} alt=''/>
                </NavLink>
                <NavLink exact to='/plamenstream'>
                    <img src={logoStream} alt=''/>
                </NavLink>
            </div>
        </div>
    )
}

export default AlternativeNavbar

const styles = {
    nav:{
        top:'0',
    },
}