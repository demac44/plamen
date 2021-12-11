import React from 'react'
import { NavLink } from 'react-router-dom'

const EditProfileNav = () => {
    return (
        <div className="edit-profile-nav">
            <ul>
               <NavLink to='/settings/account'><li>Account settings</li></NavLink>
               <NavLink to='/settings/info'><li>Edit user information</li> </NavLink>    
            </ul>
        </div>
    )
}

export default EditProfileNav
