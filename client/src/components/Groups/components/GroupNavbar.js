import React from 'react'
import { NavLink } from 'react-router-dom'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const roles = ['ADMIN', 'CREATOR', 'MODERATOR']

const GroupNavbar = ({groupid, role}) => {
    return (
        <div className='group-navbar'>
            <div className='flex-sa' style={{width:'100%', height:'100%'}}>
                <NavLink exact to={'/community/'+groupid}>
                    <FontAwesomeIcon icon='newspaper' color='darkgreen'/>
                </NavLink>
                <NavLink exact to={'/community/'+groupid+'/saved'}>
                    <FontAwesomeIcon icon='bookmark' color='#ffbb00'/>
                </NavLink>
                <NavLink exact to={'/community/'+groupid+'/info'}>
                    <FontAwesomeIcon icon='info-circle' color='#36579e'/>
                </NavLink>
                {roles.includes(role) && <NavLink exact to={'/community/'+groupid+'/settings'}>
                    <FontAwesomeIcon icon='user-cog' color='silver'/>
                </NavLink>}
            </div>
        </div>
    )
}

export default GroupNavbar