import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import '../../../components/Profile/Settings/User info/style.css'
import '../../../components/Profile/Settings/style.css'
import AlternativeNavbar from '../../../components/General components/AlternativeNavbar'
import Sidebar from '../../../components/General components/Sidebar'
import Navbar from '../../../components/Navbar/Navbar'
import EditProfileNav from '../../../components/Profile/Settings/EditProfileNav'
import EditBDate from '../../../components/Profile/Settings/User info/EditBDate'
import EditGender from '../../../components/Profile/Settings/User info/EditGender'
import EditInfoBox from '../../../components/Profile/Settings/User info/EditInfoBox'
import EditInterests from '../../../components/Profile/Settings/User info/EditInterests'

const UserInfo = () => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const {data, loading} = useQuery(USER_INFO, {
        variables:{
            userID: uid
        }
    })

    return (
        <>
            <Navbar/>
            <AlternativeNavbar/>
            <div className='wrapper'> 
                <div className='container-main'>
                    <Sidebar/>
                    <div className='container-left'>
                        <div className='box flex-ctr'>
                            <Link to='/settings'>
                                <i className='arrow-left settings-arrow-back'/>
                            </Link>
                            <h3>
                                User info
                            </h3>
                        </div>

                        {!loading && <EditInterests data={data?.get_user_interests} uid={uid}/>}

                        {!loading &&<EditInfoBox data={{
                            job:data?.get_user_info?.job,
                            university:data?.get_user_info?.university,
                            high_school:data?.get_user_info?.high_school,
                            phone_number:data?.get_user_info?.phone_number,
                            country:data?.get_user_info?.country,
                            city:data?.get_user_info?.city,
                            uid: uid
                        }}/>}

                        {!loading && <EditBDate data={data?.get_user_info?.bDate} uid={uid}/>}

                        {!loading && <EditGender data={data?.get_user_info?.gender} uid={uid}/>}
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

const USER_INFO = gql`
    query ($userID: Int!){
        get_user_info (userID: $userID){
            job
            university
            high_school
            bDate
            phone_number
            date_joined
            gender
            country
            city
        }
        get_user_interests(userID: $userID){
            interest
        }
    }
`