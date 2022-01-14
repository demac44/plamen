import React, { useEffect } from 'react'
import AlternativeNavbar from '../../../components/General components/AlternativeNavbar'
import Sidebar from '../../../components/General components/Sidebar'
import Navbar from '../../../components/Navbar/Navbar'
import EditProfileNav from '../../../components/Profile/Settings/EditProfileNav'
import '../../../components/Profile/Settings/style.css'
import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo';
import { useSelector } from 'react-redux'

const Settings = () => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [set_last_seen] = useMutation(SET_LAST_SEEN)

    useEffect(()=>{
        set_last_seen({variables:{userID: uid}})
    }, [set_last_seen, uid])

    return (
        <>
            <Navbar/>
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

const SET_LAST_SEEN = gql`
mutation ($userID: Int){
    set_last_seen (userID: $userID){
    userID
    }
}`