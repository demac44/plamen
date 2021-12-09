import React, { useCallback, useState } from 'react'
import ProfileFollowBtn from './components/ProfileFollowBtn'
import ProfileEditBtn from './components/ProfileEditBtn'
import ProfileInfo from './ProfileInfo'
import SendMsgBtn from './components/SendMsgBtn'
import Avatar from '../General components/Avatar'
import Story from '../Stories/components/Story'

const ProfileInfoBox = ({info}) => {
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
                    <Avatar size='170px' image={info.user.profile_picture}/>
                </div>
                <ProfileInfo info={info}/>
                {info.user.currentUser ? <ProfileEditBtn/> : (
                <>
                <ProfileFollowBtn userID={info.user.userID}/>
                <SendMsgBtn userID={info.user.userID}/>
                </>
                )} 
            </div>
            {openStory && <Story 
                allData={{
                    first_name: info.user.first_name,
                    last_name: info.user.last_name,
                    profile_picture:info.user.profile_picture,
                    userID: info.user.userID,
                    stories: info.stories
                }} 
                i={0} 
                isProfile={true}
                closeStoryCallback={closeStoryCallback}
                />}
        </>
    )
}

export default ProfileInfoBox
