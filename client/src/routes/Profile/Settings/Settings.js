import React from 'react'
import AlternativeNavbar from '../../../components/General components/AlternativeNavbar'
import Sidebar from '../../../components/General components/Sidebar'
import Navbar from '../../../components/Navbar/Navbar'
import EditProfileNav from '../../../components/Profile/components/Settings/EditProfileNav'
import '../../../components/Profile/components/Settings/style.css'

const Settings = ({isLogged}) => {
    return (
        <>
            <Navbar isLogged={isLogged}/>
            <AlternativeNavbar/>
            <div className='wrapper'> 
                <div className='container-main'>
                    <Sidebar/>
                    <div className='container-left'>
                        <EditProfileNav/>
                    </div>
                    <div className='container-right'>
                    </div>
                </div>
            </div>
        </> 
    )
}

export default Settings
