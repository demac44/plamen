import React, { useCallback, useState } from 'react'
import FollowBtn from './components/FollowBtn'
import ProfileEditBtn from './components/ProfileEditBtn'
import ProfileInfo from './ProfileInfo'
import SendMsgBtn from './components/SendMsgBtn'
import Avatar from '../General components/Avatar'
import Story from '../Stories/components/Story'

const ProfileInfoBox = ({info, updatedCallback}) => {
    const [openStory, setOpenStory] = useState(false)

    const closeStoryCallback = useCallback(()=>{
        setOpenStory(false)
    }, [setOpenStory])


    return (
        <>
            <div className="profile-top-box">
                <div style={{border: info.stories.length>0 && '3px solid #ffbb00', borderRadius:'50%'}} onClick={()=>{
                    info.stories.length>0 && setOpenStory(true)
                }}>
                    <Avatar size='200px' image={info.user.profile_picture}/>
                </div>
                <ProfileInfo info={info}/>
                {info.user.currentUser ? <ProfileEditBtn/> : (
                <>
                <FollowBtn/>
                <SendMsgBtn userID={info.user.userID}/>
                </>
                )} 
            </div>
            {openStory && <Story 
                userInfo={info.user} 
                allData={info} 
                i={0} 
                isProfile={true}
                closeStoryCallback={closeStoryCallback}
                updatedCallback={updatedCallback}
                />}
        </>
    )
}

export default ProfileInfoBox
