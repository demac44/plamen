import React from 'react'
import { NavLink } from 'react-router-dom'
import './style.css'

const EditProfileNav = () => {
    return (
        <div className="edit-profile-nav">
            <ul>
               <NavLink to='/settings/account'><li>Account settings</li></NavLink>
               <NavLink to='/settings/info'><li>User info</li> </NavLink>    
               <NavLink to='/settings/blocked_users'><li>Blocked users</li></NavLink>    
            </ul>
        </div>
    )
}
export default EditProfileNav
