import React from 'react'
import Avatar from '../UI/Avatar'
import ProfileEditBtn from './ProfileEditBtn'
import ProfileInfo from './ProfileInfo'

const ProfileInfoBox = () => {
    return (
        <div className="profile-info-box">
            <Avatar height='200px'/>
            <ProfileInfo/>
            <ProfileEditBtn/>
    </div>
    )
}

export default ProfileInfoBox
