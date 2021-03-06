import React from 'react'
import { useSelector } from 'react-redux'
import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { Link, Redirect, useParams } from 'react-router-dom'
import Sidebar from '../../../components/General components/Sidebar'
import SettingsMenu from '../../../components/Groups/Settings/SettingsMenu'
import EditGroupVisibility from '../../../components/Groups/Settings/Manage info/EditGroupVisibility'
import AlternativeNavbar from '../../../components/General components/AlternativeNavbar'
import BannerLoader from '../../../components/General components/Loaders/BannerLoader'
import GroupBanner from '../../../components/Groups/components/GroupBanner'
import GroupNavbar from '../../../components/Groups/components/GroupNavbar'
import Navbar from '../../../components/Navbar/Navbar'
import EditGroupInfo from '../../../components/Groups/Settings/Manage info/EditGroupInfo'
import EditGroupName from '../../../components/Groups/Settings/Manage info/EditGroupName'
import EditTags from '../../../components/Groups/Settings/Manage info/EditTags'
import '../../../components/Groups/groups.css'
import ChangeBanner from '../../../components/Groups/Settings/Manage info/ChangeBanner'

const roles = ['ADMIN', 'CREATOR', 'MODERATOR']

const GroupEditInfo = () => {
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
                                <h3>Community settings</h3>
                            </div>

                            <EditGroupVisibility 
                                visibility={data?.get_group?.closed} 
                                groupid={groupid}
                                refetch={refetch}
                            />

                            <ChangeBanner 
                                groupID={parseInt(groupid)} 
                                banner={data?.get_group?.banner_image}
                                refetch={refetch}
                            />

                            <EditGroupName 
                                group_name={data?.get_group?.group_name} 
                                groupid={groupid}
                                refetch={refetch}/>

                            <EditGroupInfo 
                                group_description={data?.get_group?.group_description} 
                                group_rules={data?.get_group?.group_rules} 
                                groupid={groupid}
                                refetch={refetch}/>

                            <EditTags 
                                gTags={data?.get_group?.group_tags} 
                                refetch={refetch}
                                groupid={groupid}
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

export default GroupEditInfo

const GET_GROUP = gql`
    query($gid: Int!, $uid: Int!){
        get_group(groupID: $gid){
            groupID
            group_name
            banner_image
            group_description
            group_rules
            group_tags
            closed
        }
        get_group_user (groupID: $gid, userID: $uid){
            role
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
    }
}