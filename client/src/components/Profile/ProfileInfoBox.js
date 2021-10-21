import React from 'react'
import Avatar from '../UI/Avatar'
import FollowBtn from './Functional components/FollowBtn'
import ProfileEditBtn from './UI/ProfileEditBtn'
import ProfileInfo from './ProfileInfo'

const ProfileInfoBox = ({info}) => {
    return (
        <div className="profile-info-box">
            <Avatar height='200px' pfp={info.user.profile_picture}/>
            <ProfileInfo info={info}/>
            {info.user.currentUser ? <ProfileEditBtn/> : <FollowBtn/>} 
    </div>
    )
}

export default ProfileInfoBox
