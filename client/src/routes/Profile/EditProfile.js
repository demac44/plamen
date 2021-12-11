import React, { useCallback, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'

import '../../App.css'
import '../../General.css'
import EditForm from '../../components/Profile/components/Edit profile/EditForm'
import Sidebar from '../../components/General components/Sidebar'
import AlternativeNavbar from '../../components/General components/AlternativeNavbar'

import EditProfileNav from '../../components/Profile/components/Edit profile/EditProfileNav'
import EditPfpMenu from '../../components/Profile/components/Edit profile/Edit pfp/EditPfpMenu'

const EditProfile = ({isLogged}) => {
    // let fname,lname,username;
    const [pfpMenu, setPfpMenu] = useState(false)
    const ls = JSON.parse(localStorage.getItem('user'))

    const handleMenu = useCallback(val => {
        setPfpMenu(val)
    }, [setPfpMenu])


    return (
        <>
            <Navbar callback={()=>{return}} isLogged={isLogged}/>
            <AlternativeNavbar/>
            {pfpMenu && <EditPfpMenu closeMenu={handleMenu}/>}
            <div className='wrapper'> 
                <div className='container-main'>
                    <Sidebar/>
                    <div className='container-left'>
                        <EditForm handleMenu={handleMenu}/>
                    </div>
                    <div className='container-right'>
                        <EditProfileNav/>
                    </div>
                </div>
            </div>
        </> 
    )
}

export default EditProfile


const styles = {
    changeBtn: {
        marginLeft: '20px', 
        color: 'white',
        backgroundColor:'#7f7f7f',
        borderRadius: '20px',
        padding: '10px 30px',
        cursor:'pointer',
    }
}