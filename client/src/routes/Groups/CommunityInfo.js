import React, { useEffect, useState, memo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import '../../components/Groups/groups.css'
import { useSelector } from 'react-redux'
import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import Navbar from '../../components/Navbar/Navbar'
import GroupBanner from '../../components/Groups/components/GroupBanner'
import InfoBox from '../../components/Groups/components/InfoBox'
import TagsBox from '../../components/General components/TagsBox'
import Sidebar from '../../components/General components/Sidebar'
import AlternativeNavbar from '../../components/General components/AlternativeNavbar'
import GroupNavbar from '../../components/Groups/components/GroupNavbar'
import BannerLoader from '../../components/General components/Loaders/BannerLoader'

const CommunityInfo = ({isLogged}) => {
    const {groupid} = useParams()
    const [tags, setTags] = useState([])
    const uid = useSelector(state => state.isAuth.user?.userID)
    const {data, loading, refetch} = useQuery(GET_GROUP, {
        variables:{
            gid: parseInt(groupid),
            limit:20,
            offset:0,
            uid
        }
    })

    useEffect(()=>{
        if(data){
            setTags(data?.get_group?.group_tags?.split(','))
        }
    }, [refetch, data])

    if(!loading){
        if(!data?.get_group) return <Redirect to='/404'/>
    }


    return (
        <>
            <Navbar isLogged={isLogged}/> 
            <AlternativeNavbar/>
            <div className='wrapper'>
                <Sidebar/>
                <div className='container-main' style={{paddingTop:'0'}}>
                        <div className='container-left'>
                            {loading ? <BannerLoader/> : <GroupBanner info={data?.get_group} user={data.get_group_user}/>}
                            <GroupNavbar groupid={groupid} role={data?.get_group_user?.role}/>
                            {!loading && <TagsBox tags={tags}/>}    

                            {!loading && <InfoBox data={data.get_group} membersCount={data.get_group_members.length} user={data.get_group_user}/>}
                        </div>
                        <div className='container-right' style={{width:'35%'}}>
                        </div>
                </div>
            </div>
        </>
    )
}

export default memo(CommunityInfo)

const GET_GROUP = gql`
    query($gid: Int!, $limit: Int, $offset: Int, $uid: Int!){
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
            userID
        }
    }
`