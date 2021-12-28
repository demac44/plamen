import React from 'react'
import { NavLink } from 'react-router-dom'

const ProfileEditBtn = () => {
    return (
        <NavLink exact to='/settings' className="profile-top-box-buttons">
            <p>Settings</p>
        </NavLink>
    )
}

export default ProfileEditBtn
