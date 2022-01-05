import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux';
import '../../../components/Profile/Settings/style.css'
import Sidebar from '../../../components/General components/Sidebar'
import AlternativeNavbar from '../../../components/General components/AlternativeNavbar'
import Navbar from '../../../components/Navbar/Navbar'
import EditForm from '../../../components/Profile/Settings/Account settings/EditForm'
import EditProfileNav from '../../../components/Profile/Settings/EditProfileNav'
import EditPfpMenu from '../../../components/Profile/Settings/Account settings/EditPfpMenu'
import ChangePassBox from '../../../components/Profile/Settings/Account settings/ChangePassBox'
import DisableAccBox from '../../../components/Profile/Settings/Account settings/DisableAccBox'


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
