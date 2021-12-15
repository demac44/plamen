import React from 'react'
import { NavLink } from 'react-router-dom'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const AlternativeNavbar = ({chat}) => {
    return (
        <div className='alternative-navbar' style={chat && styles.nav}>
            <ul className='flex-sa' style={{width:'100%', height:'100%'}}>
                <NavLink exact to="/feed">
                    <li>
                        <FontAwesomeIcon icon='newspaper' color='darkgreen' fixedWidth />
                    </li>
                </NavLink>
                <NavLink exact to='/explore'>
                <li>
                    <FontAwesomeIcon icon='compass' color='#9933ff' fixedWidth/>
                </li>
                </NavLink>
                <NavLink exact to='/saved'>
                    <li>
                        <FontAwesomeIcon icon='bookmark' color='#ffbb00' fixedWidth/>
                    </li>
                </NavLink>
                <NavLink exact to='/communities'>
                <li>
                    <FontAwesomeIcon icon='users' color='teal' fixedWidth/>
                </li>
                </NavLink>
                <NavLink exact to='/someapptube'>
                    <li>
                        <FontAwesomeIcon icon='play' color='darkred' fixedWidth/>
                    </li>
                </NavLink>
            </ul>
        </div>
    )
}

export default AlternativeNavbar

const styles = {
    nav:{
        position:'fixed',
        top:'-60px',
    }
}