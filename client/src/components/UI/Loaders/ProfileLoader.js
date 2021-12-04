import React from 'react'
import Navbar from '../../Navbar/Navbar'
import LeftNavbar from '../LeftNavbar'
import PostLoader from './PostLoader'
import ProfileBoxLoader from './ProfileBoxLoader'

const ProfileLoader = () => {
    return (
        <>
            <Navbar callback={()=>{return}} isLogged={true}/>
            <div className='wrapper'>
                <div className='main'>
                    <LeftNavbar/>
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
