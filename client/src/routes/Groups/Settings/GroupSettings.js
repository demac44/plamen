import React from 'react'
import AlternativeNavbar from '../../../components/General components/AlternativeNavbar'
import BannerLoader from '../../../components/General components/Loaders/BannerLoader'
import GroupBanner from '../../../components/Groups/components/GroupBanner'
import GroupNavbar from '../../../components/Groups/components/GroupNavbar'
import Navbar from '../../../components/Navbar/Navbar'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { Redirect, useParams } from 'react-router-dom'
import Sidebar from '../../../components/General components/Sidebar'
import SettingsMenu from '../../../components/Groups/components/Settings/SettingsMenu'

const roles = ['ADMIN', 'CREATOR', 'MODERATOR']

const GroupSettings = ({isLogged}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const {groupid} = useParams()
    const {data, loading, refetch} = useQuery(GET_GROUP, {
        variables:{
            gid: parseInt(groupid),
            uid: ls.userID
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
