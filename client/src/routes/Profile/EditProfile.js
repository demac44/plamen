import React, { useCallback, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'

import '../../App.css'
import '../../General.css'
import Sidebar from '../../components/Profile/Functional components/Edit profile/Sidebar'
import EditPfpChoice from '../../components/Profile/Functional components/Edit profile/Edit pfp/EditPfpChoice'
import Avatar from '../../components/UI/Avatar'
import EditForm from '../../components/Profile/Functional components/Edit profile/EditForm'

const EditProfile = ({isLogged}) => {
    // let fname,lname,username;
    const [pfpMenu, setPfpMenu] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))

    const closeMenu = useCallback(val => {
        setPfpMenu(val)
    }, [setPfpMenu])


    return (
        <>
            <Navbar callback={()=>{return}} isLogged={isLogged}/>
            {pfpMenu && <EditPfpChoice callback={closeMenu}/>}
            <div className='wrapper'> 
                <div className='main'>
                    <div className='profile-container'>
                        <div className='edit-pf-box'>
                            <Sidebar/>
                            <div className='edit-box'>
                                <div className='flex-h' style={{width: '300px'}}>
                                    <Avatar height='70px' width='70px' pfp={user.profile_picture}/>
                                    <h4 style={styles.changeBtn} onClick={()=>setPfpMenu(true)}>Change</h4>
                                </div>
                                <EditForm/>
                            </div>
                        </div>
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