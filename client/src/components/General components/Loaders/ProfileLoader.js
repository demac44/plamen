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
                <Sidebar/>
                <div className='container-profile'>
                    <ProfileBoxLoader/>
                </div>
                <div className='container-main'>
                    <div className='container-left'>
                        <PostLoader/>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ProfileLoader
