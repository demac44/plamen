import React from 'react'
import defaultImage from '../../images/pfp.jpg'

const Avatar = ({height, width, pfp}) => {

    return (
        <div className="user-avatar flex-ctr" style={{height: height, width: width}}>
            <img src={pfp || defaultImage} alt="avatar" className="avatar-img"/> 
        </div>
    )
}

export default Avatar
