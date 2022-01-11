import React from 'react'
import { NavLink } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const roles = ['ADMIN', 'CREATOR', 'MODERATOR']

const GroupNavbar = ({groupid, role}) => {
    return (
        <div className='group-navbar'>
            <div className='flex-sa' style={{width:'100%', height:'100%'}}>
                <NavLink exact to={'/community/'+groupid}>
                    <i className='fas fa-newspaper' style={{color: 'darkgreen'}}/>
                </NavLink>
                <NavLink exact to={'/community/'+groupid+'/chat'}>
                    <i className='fas fa-comment-dots' style={{color: 'teal'}}/>
                </NavLink>
                <NavLink exact to={'/community/'+groupid+'/saved'}>
                    <i className='fas fa-bookmark' style={{color: '#ffbb00'}}/>
                </NavLink>
                <NavLink exact to={'/community/'+groupid+'/info'}>
                    <i className='fas fa-info-circle' style={{color: '#36579e'}}/>
                </NavLink>
                {roles.includes(role) && <NavLink exact to={'/community/'+groupid+'/settings'}>
                    <i className='fas fa-user-cog' style={{color: 'silver'}}/>
                </NavLink>}
            </div>
        </div>
    )
}

export default GroupNavbar