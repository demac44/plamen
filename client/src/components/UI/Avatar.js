import React from 'react'
import defaultImage from '../../images/pfp.jpg'

const Avatar = ({height}) => {
    let ls = JSON.parse(localStorage.getItem('user')) 
    return (
        <div className="current-user-avatar" style={{height: height}}>
            <img src={ls.pfp || defaultImage} alt="avatar" className="avatar-img" style={{height:'100%'}}/> 
        </div>
    )
}

export default Avatar
