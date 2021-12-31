import React from 'react'
import { NavLink } from 'react-router-dom'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import logoTube from '../../images/logo-red-min.png'
import logoStream from '../../images/logo-green-min.png'

const AlternativeNavbar = ({chat}) => {
    return (
        <div className='alternative-navbar' style={chat && styles.nav}>
            <div className='flex-sa' style={{width:'100%', height:'100%'}}>
                <NavLink exact to="/">
                    <FontAwesomeIcon icon='newspaper' color='darkgreen' fixedWidth />
                </NavLink>
                <NavLink exact to='/explore'>      
                    <FontAwesomeIcon icon='compass' color='#9933ff' fixedWidth/>
                </NavLink>
                <NavLink exact to='/saved'>
                    <FontAwesomeIcon icon='bookmark' color='#ffbb00' fixedWidth/>
                </NavLink>
                <NavLink exact to='/communities'>
                    <FontAwesomeIcon icon='users' color='teal' fixedWidth/>
                </NavLink>
                <NavLink exact to='/plamentube'>
                    <img src={logoTube}/>
                </NavLink>
                <NavLink exact to='/plamenstream'>
                    <img src={logoStream}/>
                </NavLink>
            </div>
        </div>
    )
}

export default AlternativeNavbar

const styles = {
    nav:{
        position:'fixed',
        top:'-60px',
    },
}