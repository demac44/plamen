import React from 'react'
import Avatar from '../../General components/Avatar'

const ProfilePfp = ({length, blockedUser, pfp, openStory}) => {
    return (
        <>
            <div style={{border: (length>0 && !blockedUser) && '3px solid #ffbb00', 
                        borderRadius:'5px', 
                        position:'relative'}} 
                        onClick={()=>{(length>0 && !blockedUser) && openStory(true)
            }}>

            <Avatar size='170px' image={pfp} profile={true}/>
            </div>
        </>
    )
}

export default ProfilePfp