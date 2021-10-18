import React from 'react'
import defaultImage from '../../images/pfp.jpg'

const Avatar = ({height, pfp}) => {
    return (
        <div className="user-avatar" style={{height: height}}>
            <img src={pfp || defaultImage} alt="avatar" className="avatar-img" style={{height:'100%'}}/> 
        </div>
    )
}

export default Avatar
