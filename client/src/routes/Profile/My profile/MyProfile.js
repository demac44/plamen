import React from 'react'
import Navbar from '../../../components/Navbar/Navbar'

import '../../../App.css'
import '../../../General.css'
import LeftNavbar from '../../../components/UI/LeftNavbar'
import ProfileInfoBox from '../../../components/Profile/ProfileInfoBox'
import AddPost from '../../../components/Functional components/AddPost'

const MyProfile = () => {
    return (
        <div>
            <Navbar/>
            <div className='wrapper'>
                <div className='main'>
                    <LeftNavbar/>
                    <div className='profile-container'>
                        <ProfileInfoBox/>
                        <AddPost/>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default MyProfile


