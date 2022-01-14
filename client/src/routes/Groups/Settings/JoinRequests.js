import React from 'react'
import AlternativeNavbar from '../../../components/General components/AlternativeNavbar'
import BannerLoader from '../../../components/General components/Loaders/BannerLoader'
import GroupBanner from '../../../components/Groups/components/GroupBanner'
import GroupNavbar from '../../../components/Groups/components/GroupNavbar'
import Navbar from '../../../components/Navbar/Navbar'
import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { Link, Redirect, useParams } from 'react-router-dom'
import Sidebar from '../../../components/General components/Sidebar'
import SettingsMenu from '../../../components/Groups/Settings/SettingsMenu'
import JoinRequestsBox from '../../../components/Groups/Settings/Manage users/Join requests/JoinRequestsBox'
import { useSelector } from 'react-redux'
import '../../../components/Groups/groups.css'

const roles = ['ADMIN', 'CREATOR', 'MODERATOR']

const GroupSettings = () => {
    const uid = useSelector(state => state.isAuth.user?.userID)
    const {groupid} = useParams()
    const {data, loading, refetch} = useQuery(GET_GROUP, {
        variables:{
            gid: parseInt(groupid),
            uid
        }
    })

    if(!loading){
        if(!(roles.includes(data?.get_group_user?.role))) return <Redirect to='/404'/>
    }

    return (
        <>
            <Navbar/> 
            <AlternativeNavbar/>
            <div className='wrapper'>
                <Sidebar/>
                <div className='container-profile'>
                    {loading ? <BannerLoader/> : <GroupBanner info={data?.get_group} user={data?.get_group_user}/>}
                    <GroupNavbar groupid={groupid} role={data?.get_group_user?.role}/>
                </div>
                {roles.includes(data?.get_group_user?.role) && <div className='container-main' style={{paddingTop:'20px'}}>
                        <div className='container-left'>
                            <div className='box flex-ctr'>
                                <Link to={'/community/'+groupid+'/settings'}>
                                    <i className='fas fa-arrow-left' style={styles.arrowBack}/>
                                </Link>
                                <h3>Join requests</h3>
                            </div>

                            <JoinRequestsBox 
                                requests={data?.get_group_join_requests}
                                refetch={refetch}
                            />

                        </div>
                        <div className='container-right' style={{width:'35%'}}>
                            <SettingsMenu groupid={groupid}/>
                        </div>
                </div>}
            </div>
        </>
    )
}

export default GroupSettings

const GET_GROUP = gql`
    query($gid: Int!, $uid: Int!){
        get_group(groupID: $gid){
            groupID
            group_name
            banner_image
        }
        get_group_user (groupID: $gid, userID: $uid){
            role
        }
        get_group_join_requests(groupID: $gid){
            userID
            groupID
            first_name
            last_name
            username
            groupID
            profile_picture
        }
    }
`
const styles = {
    arrowBack:{
        position:'absolute',
        top:'13px',
        left:'15px',
        fontSize:'20px',
        cursor:'pointer',
        color:'white'
    },
    noPosts:{
        color:'white',
        textAlign:'center',
        marginTop:'100px'
    }
}