import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {gql} from 'graphql-tag'
import { useQuery} from 'react-apollo';
import '../../../components/Profile/Settings/style.css'
import Navbar from '../../../components/Navbar/Navbar'
import Sidebar from '../../../components/General components/Sidebar'
import AlternativeNavbar from '../../../components/General components/AlternativeNavbar'
import EditProfileNav from '../../../components/Profile/Settings/EditProfileNav'
import BlockedUserBox from '../../../components/Profile/Settings/Blocked users/BlockedUserBox';


const BlockedUsers = ({isLogged}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const {data, loading, refetch} = useQuery(GET_BLOCKED_USERS, {
        variables:{
            uid
        }
    })

    return (
        <>
            <Navbar callback={()=>{return}} isLogged={isLogged}/>
            <AlternativeNavbar/>
            <div className='wrapper'> 
                <div className='container-main'>
                    <Sidebar/>
                    <div className='container-left'>
                        <div className='box flex-ctr'>
                            <Link to='/settings'>
                                <FontAwesomeIcon icon='arrow-left' className='settings-arrow-back'/>
                            </Link>
                            <h3>
                                Blocked users
                            </h3>
                        </div>

                        <div className='box flex-ctr'>
                            {!loading && (data?.get_blocked_users.length>0 ?
                            data?.get_blocked_users?.map(user => <BlockedUserBox 
                                                                        user={user} 
                                                                        refetch={refetch}
                                                                        uid={uid}
                                                                    />)
                            : <p>No blocked users</p>)}
                        </div>
                    </div>
                    <div className='container-right'>
                        <EditProfileNav/>
                    </div>
                </div>
            </div>
        </> 
    )
}

export default BlockedUsers


const GET_BLOCKED_USERS = gql`
    query ($uid: Int!){
        get_blocked_users(userID:$uid){
            first_name
            last_name
            userID
            username
            profile_picture
        }
    }
`