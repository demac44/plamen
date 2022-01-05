import React from 'react'
import { Redirect, useParams } from 'react-router-dom'
import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { useSelector } from 'react-redux'
import AlternativeNavbar from '../../../components/General components/AlternativeNavbar'
import BannerLoader from '../../../components/General components/Loaders/BannerLoader'
import GroupBanner from '../../../components/Groups/components/GroupBanner'
import GroupNavbar from '../../../components/Groups/components/GroupNavbar'
import Navbar from '../../../components/Navbar/Navbar'
import Sidebar from '../../../components/General components/Sidebar'
import SettingsMenu from '../../../components/Groups/Settings/SettingsMenu'
import '../../../components/Groups/groups.css'

const roles = ['ADMIN', 'CREATOR', 'MODERATOR']

const GroupSettings = ({isLogged}) => {
    const uid = useSelector(state => state.isAuth.user?.userID)
    const {groupid} = useParams()
    const {data, loading} = useQuery(GET_GROUP, {
        variables:{
            gid: parseInt(groupid),
            uid
        }
    })

    if(!loading){
        if(!data?.get_group?.groupID || !data || !data?.get_group || !data?.get_group_user) return <Redirect to='/404'/>
    }

    return (
        <>
            <Navbar isLogged={isLogged}/> 
            <AlternativeNavbar/>
            <div className='wrapper'>
                <Sidebar/>
                <div className='container-profile'>
                    {loading ? <BannerLoader/> : <GroupBanner info={data?.get_group} user={data?.get_group_user}/>}
                    <GroupNavbar groupid={groupid} role={data?.get_group_user?.role}/>
                </div>
                {roles.includes(data?.get_group_user?.role) && <div className='container-main' style={{paddingTop:'20px'}}>
                        <div className='container-left'>
                            <SettingsMenu groupid={groupid}/>
                        </div>
                        <div className='container-right' style={{width:'35%'}}>
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
    }
`
