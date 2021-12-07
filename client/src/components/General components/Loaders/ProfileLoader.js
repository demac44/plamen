import React from 'react'
import Navbar from '../../Navbar/Navbar'
import PostLoader from './PostLoader'
import ProfileBoxLoader from './ProfileBoxLoader'
import Sidebar from '../Sidebar'

const ProfileLoader = () => {
    return (
        <>
            <Navbar callback={()=>{return}} isLogged={true}/>
            <div className='wrapper'>
                <div className='main'>
                    <Sidebar/>
                    <div className='profile-container'>
                        <ProfileBoxLoader/>
                        <PostLoader/>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ProfileLoader
