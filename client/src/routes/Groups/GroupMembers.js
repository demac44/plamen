import React, { useEffect, useState, memo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import Navbar from '../../components/Navbar/Navbar'
import GroupBanner from '../../components/Groups/components/GroupBanner'
import InfoBox from '../../components/Groups/components/InfoBox'
import TagsBox from '../../components/General components/TagsBox'
import MembersBox from '../../components/Groups/components/MembersBox'
import Sidebar from '../../components/General components/Sidebar'
import AlternativeNavbar from '../../components/General components/AlternativeNavbar'
import GroupNavbar from '../../components/Groups/components/GroupNavbar'
import BannerLoader from '../../components/General components/Loaders/BannerLoader'
import '../../components/Groups/groups.css'

const GroupMembers = () => {
    const {groupid} = useParams()
    const [tags, setTags] = useState([])
    const uid = useSelector(state => state?.isAuth.user?.userID)
    const {data, loading, refetch} = useQuery(GET_GROUP, {
        variables:{
            gid: parseInt(groupid),
            uid
        }
    })

    useEffect(()=>{
        if(data){
            setTags(data?.get_group?.group_tags?.split(','))
        }
    }, [refetch, data])

    if(!loading){
        if(!data?.get_group?.groupID || !data || !data?.get_group) return <Redirect to='/404'/>
    }

    return (
        <>
            <Navbar/> 
            <AlternativeNavbar/>
            <div className='wrapper'>
                <div className='main'>
                    <Sidebar/>
                        <div className='container-main' style={{paddingTop:'10px'}}>
                            <div className='container-left'>
                                {loading ? <BannerLoader/> : <GroupBanner info={data?.get_group} user={data?.get_group_user}/>}
                                <GroupNavbar groupid={groupid} role={data?.get_group_user?.role}/>
                                {!loading && <TagsBox tags={tags}/>} 

                                {!loading &&
                                ((data.get_group_user) ?

                                    <MembersBox members={data.get_group_members}/>

                                    : <span className='flex-ctr' style={styles.locked}>
                                        <i className='fas fa-lock'/>
                                        <p style={{marginLeft:'10px'}}>Join to see community members!</p>
                                    </span>)}
                            </div>
                            <div className='container-right'>
                               {!loading && <InfoBox data={data.get_group} membersCount={data.get_group_members.length} user={data.get_group_user}/>}
                            </div>
                        </div>
                </div>
            </div>
        </>
    )
}

export default memo(GroupMembers)

const GET_GROUP = gql`
    query($gid: Int!, $uid: Int!){
        get_group(groupID: $gid){
            groupID
            group_name
            group_creator_id
            date_created
            closed
            group_tags
            group_rules
            group_description
            banner_image
        }
        get_group_user (groupID: $gid, userID: $uid){
            role
        }
        get_group_members(groupID:$gid){
            username
            first_name
            last_name
            userID
            profile_picture
            date_joined
            role
        }
    }
`
const styles = {
    locked:{
        color:'white',
        width:'100%',
        height:'100px'
    }
}