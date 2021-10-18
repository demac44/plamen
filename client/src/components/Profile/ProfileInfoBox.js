import React from 'react'
import Avatar from '../UI/Avatar'
import FollowBtn from './Functional components/FollowBtn'
import ProfileEditBtn from './Functional components/ProfileEditBtn'
import ProfileInfo from './ProfileInfo'

const ProfileInfoBox = ({user, count}) => {
    return (
        <div className="profile-info-box">
            <Avatar height='200px' pfp={user.profile_picture}/>
            <ProfileInfo user={user} count={count}/>
            {user.currentUser ? <ProfileEditBtn/> : <FollowBtn/>}
    </div>
    )
}

export default ProfileInfoBox
