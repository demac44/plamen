import React, { useState, useCallback } from 'react'
import ShowUsersList from '../UI/Users list/ShowUsersList.js'

const ProfileInfo = ({info}) => {  
    const [follows, setFollows] = useState([])
    const [follType, setFollType] = useState('')
    const [showFollows, setShowFollows] = useState(false)



    const callbackShowFollows = useCallback(val => {
        setShowFollows(val)
      }, [setShowFollows]);


    const handleOpen = (type) => {
        setFollows(type)
        setShowFollows(true)
    }


    return (
        <>
            {showFollows && <ShowUsersList follows={follows} ft={follType} callback={callbackShowFollows}/>}
            <div className="pf-info">
                <h4 className="pf-name">{info.user.first_name+' '+info.user.last_name}</h4>    
                <h5 className="pf-tagname">@{info.user.username}</h5>
                <div className="pf-stats">
                    <div onClick={()=>{
                        handleOpen(info.following)
                        setFollType('Following')
                        }}>
                        <h6>Following</h6>
                        <p>{info.following.length}</p>
                    </div>
                    <div onClick={()=>{
                        handleOpen(info.followers)
                        setFollType('Followers')
                        }}>
                        <h6>Followers</h6>
                        <p>{info.followers.length}</p>
                    </div>
                    <div>
                        <h6>Posts</h6>
                        <p>{info.count}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileInfo
