import React, { useCallback, useState } from 'react'
import Navbar from '../../../components/Navbar/Navbar'
import { useSelector } from 'react-redux';

import EditForm from '../../../components/Profile/components/Settings/Account settings/EditForm'
import Sidebar from '../../../components/General components/Sidebar'
import AlternativeNavbar from '../../../components/General components/AlternativeNavbar'

import EditProfileNav from '../../../components/Profile/components/Settings/EditProfileNav'
import EditPfpMenu from '../../../components/Profile/components/Settings/Account settings/EditPfpMenu'
import ChangePassBox from '../../../components/Profile/components/Settings/Account settings/ChangePassBox'
import DisableAccBox from '../../../components/Profile/components/Settings/Account settings/DisableAccBox'


const AccountSettings = ({isLogged}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [pfpMenu, setPfpMenu] = useState(false)

    const handleMenu = useCallback(val => {
        setPfpMenu(val)
    }, [setPfpMenu])


    return (
        <>
            <Navbar callback={()=>{return}} isLogged={isLogged}/>
            <AlternativeNavbar/>
            {pfpMenu && <EditPfpMenu closeMenu={handleMenu} uid={uid}/>}
            <div className='wrapper'> 
                <div className='container-main'>
                    <Sidebar/>
                    <div className='container-left'>
                        <EditForm handleMenu={handleMenu} uid={uid}/>
                        <ChangePassBox uid={uid}/>
                        <DisableAccBox uid={uid}/>
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
