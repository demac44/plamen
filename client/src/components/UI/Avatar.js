import React from 'react'
import defaultImage from '../../images/pfp.jpg'

const Avatar = ({height, width, pfp}) => {

    return (
        <div className="user-avatar" style={{height: height, width: width}}>
            <img src={pfp || defaultImage} alt="avatar" className="avatar-img" style={{height:'100%', width: '100%' }}/> 
        </div>
    )
}

export default Avatar
