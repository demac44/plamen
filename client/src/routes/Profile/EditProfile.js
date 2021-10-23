import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'

import '../../App.css'
import '../../General.css'
import Sidebar from '../../components/Profile/Functional components/Edit profile/Sidebar'
import EditPfpChoice from '../../components/Profile/Functional components/Edit profile/Edit pfp/EditPfpChoice'
import Avatar from '../../components/UI/Avatar'

const EditProfile = () => {
    // let fname,lname,username;
    const [pfpMenu, setPfpMenu] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))
    return (
        <>
            <Navbar/>
            {pfpMenu && <EditPfpChoice/>}
            <div className='wrapper'> 
                <div className='main'>
                    <div className='profile-container'>
                        <div className='edit-pf-box'>
                            <Sidebar/>
                            <div className='edit-box'>
                                <div className='flex-ctr' style={{width: '300px'}}>
                                    <Avatar height='70px' width='70px' pfp={user.profile_picture}/>
                                    <h4 style={
                                        {marginLeft: '20px', 
                                        color: 'white',
                                        backgroundColor:'#',
                                        borderRadius: '20px',
                                        padding: '10px 30px',
                                        cursor:'pointer',
                                        }}>Change</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </> 
    )
}

export default EditProfile
