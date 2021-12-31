import React from 'react'
import './style.css'
const ProfileBoxLoader = () => {
    return (
        <div className='profile-top-box'>
            <div className='pf-avatar-loader'></div>
            <div className='flex-col bars-cont-loader'>
                <div className='name-bar-loader'></div>
                <div className='username-bar-loader'></div>
            </div>
            <div className='pf-tb-btn-loader'></div>
        </div>
    )
}
export default ProfileBoxLoader