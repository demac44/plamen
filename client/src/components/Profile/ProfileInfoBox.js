import React, { useCallback, useState } from 'react'
import Avatar from '../UI/Avatar'
import FollowBtn from './Functional components/FollowBtn'
import ProfileEditBtn from './UI/ProfileEditBtn'
import ProfileInfo from './ProfileInfo'
import SendMsgBtn from './Functional components/SendMsgBtn'
import Story from '../Feed/Stories/Functional components/Story'


const ProfileInfoBox = ({info, updatedCallback}) => {
    const [openStory, setOpenStory] = useState(false)

    const closeStoryCallback = useCallback(()=>{
        setOpenStory(false)
    }, [setOpenStory])


    return (
        <>
            <div className="profile-info-box">
                <div style={{border: info.stories.length>0 && '3px solid #ffbb00', borderRadius:'50%'}} onClick={()=>{
                    info.stories.length>0 && setOpenStory(true)
                }}>
                    <Avatar height='200px' width='200px' pfp={info.user.profile_picture}/>
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
                info={info.user} 
                data={info} 
                i={0} 
                isProfile={true}
                closeStoryCallback={closeStoryCallback}
                updatedCallback={updatedCallback}
                />}
        </>
    )
}

export default ProfileInfoBox
