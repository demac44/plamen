import React, { useCallback, useState } from 'react'
import Navbar from '../../../components/Navbar/Navbar'

import EditForm from '../../../components/Profile/components/Edit profile/Account settings/EditForm'
import Sidebar from '../../../components/General components/Sidebar'
import AlternativeNavbar from '../../../components/General components/AlternativeNavbar'

import EditProfileNav from '../../../components/Profile/components/Edit profile/EditProfileNav'
import EditPfpMenu from '../../../components/Profile/components/Edit profile/Edit pfp/EditPfpMenu'
import ChangePassBox from '../../../components/Profile/components/Edit profile/Account settings/ChangePassBox'
import DisableAccBox from '../../../components/Profile/components/Edit profile/Account settings/DisableAccBox'

const AccountSettings = ({isLogged}) => {
    const [pfpMenu, setPfpMenu] = useState(false)

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
                        <ChangePassBox/>
                        <DisableAccBox/>
                    </div>
                    <div className='container-right'>
                        <EditProfileNav/>
                    </div>
                </div>
            </div>
        </> 
    )
}

export default AccountSettings
