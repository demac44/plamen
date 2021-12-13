import React from 'react'
import PostLoader from './PostLoader'
import ProfileBoxLoader from './ProfileBoxLoader'
import NavbarLoader from './NavbarLoader'
import SidebarLoader from './SidebarLoader'

const ProfileLoader = () => {
    return (
        <>
            <NavbarLoader/>
            <div className='wrapper'>
                <SidebarLoader/>
                <div className='container-profile'>
                    <ProfileBoxLoader/>
                </div>
                <div className='container-main'>
                    <div className='container-left'>
                        <PostLoader/>
                    </div>
                    <div className='container-right'>
                        <PostLoader/>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ProfileLoader
