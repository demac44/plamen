import React from 'react'
import { NavLink } from 'react-router-dom'

const ProfileEditBtn = () => {
    return (
        <NavLink exact to='/settings/editprofile' className="pf-edit-follow-btn">
            <p>Edit profile</p>
        </NavLink>
    )
}

export default ProfileEditBtn
