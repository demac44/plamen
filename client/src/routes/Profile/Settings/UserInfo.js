import React from 'react'
import { Link } from 'react-router-dom'
import AlternativeNavbar from '../../../components/General components/AlternativeNavbar'
import Sidebar from '../../../components/General components/Sidebar'
import Navbar from '../../../components/Navbar/Navbar'
import EditProfileNav from '../../../components/Profile/components/Settings/EditProfileNav'
import EditBDate from '../../../components/Profile/components/Settings/User info/EditBDate'
import EditGender from '../../../components/Profile/components/Settings/User info/EditGender'
import EditInfoBox from '../../../components/Profile/components/Settings/User info/EditInfoBox'
import EditInterests from '../../../components/Profile/components/Settings/User info/EditInterests'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'

const UserInfo = ({isLogged}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const {data, loading} = useQuery(USER_INFO, {
        variables:{
            userID: ls.userID
        }
    })

    return (
        <>
            <Navbar isLogged={isLogged}/>
            <AlternativeNavbar/>
            <div className='wrapper'> 
                <div className='container-main'>
                    <Sidebar/>
                    <div className='container-left'>
                        <span style={{position:'relative'}}>
                            <Link to='/settings'>
                                <i className='fas fa-arrow-left settings-arrow-back'/>
                            </Link>
                            <h3 style={{...styles.box, textAlign:'center', color:'white'}}>
                                User info
                            </h3>
                        </span>

                        {!loading && <EditInterests data={data?.get_user_info?.interests}/>}

                        {!loading &&<EditInfoBox data={{
                            job:data?.get_user_info?.job,
                            university:data?.get_user_info?.university,
                            high_school:data?.get_user_info?.high_school,
                            phone_number:data?.get_user_info?.phone_number,
                            country:data?.get_user_info?.country,
                            city:data?.get_user_info?.city,
                        }}/>}

                        {!loading && <EditBDate data={data?.get_user_info?.bDate}/>}

                        {!loading && <EditGender data={data?.get_user_info?.gender}/>}
                    </div>
                    <div className='container-right'>
                        <EditProfileNav/>
                    </div>
                </div>
            </div>
        </> 
    )
}

export default UserInfo


const styles = {
    box:{
        position:'relative',
        border:'1px solid #2f2f2f',
        boxShadow:'5px 5px 10px black',
        padding:'10px',
        marginBottom:'15px',
        borderRadius:'5px'
    }
}

const USER_INFO = gql`
    query ($userID: Int!){
        get_user_info (userID: $userID){
            job
            university
            high_school
            bDate
            phone_number
            date_joined
            interests
            gender
            country
            city
        }
    }
`