import React, { useEffect, useState, memo } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Redirect, useParams } from 'react-router-dom'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import GroupBanner from '../../components/Groups/components/GroupBanner'
import InfoBox from '../../components/Groups/components/InfoBox'
import TagsBox from '../../components/Groups/components/TagsBox'
import Sidebar from '../../components/General components/Sidebar'

import AlternativeNavbar from '../../components/General components/AlternativeNavbar'
import CreateGroupPost from '../../components/Groups/components/Post/Create post/CreateGroupPost'

import GroupNavbar from '../../components/Groups/components/GroupNavbar'

import GroupPosts from '../../components/Groups/components/Post/GroupPosts'
import NoPosts from '../../components/General components/NoPosts'
import BannerLoader from '../../components/General components/Loaders/BannerLoader'
import PostLoader from '../../components/General components/Loaders/PostLoader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Group = ({isLogged}) => {
    const {groupid} = useParams()
    const [tags, setTags] = useState([])
    const ls = JSON.parse(localStorage.getItem('user'))
    const {data, loading, refetch} = useQuery(GET_GROUP, {
        variables:{
            gid: parseInt(groupid),
            limit:20,
            offset:0,
            uid: ls.userID
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
            <Navbar isLogged={isLogged}/> 
            <AlternativeNavbar/>
            <div className='wrapper'>
                <Sidebar/>
                <div className='container-profile'>
                    {loading ? <BannerLoader/> : <GroupBanner info={data?.get_group} user={data.get_group_user}/>}
                    <GroupNavbar groupid={groupid} role={data?.get_group_user?.role}/>
                    {!loading && <TagsBox tags={tags}/>}                        
                </div>
                <div className='container-main' style={{paddingTop:'0'}}>
                        <div className='container-left'>
                            {(data?.get_group?.closed && !data?.get_group_user) && 
                                <span className='flex-ctr' style={styles.locked}>
                                    <FontAwesomeIcon icon='lock' color='white'/>
                                    <p style={{marginLeft:'10px'}}>Join community to see posts!</p>
                                </span>}
                    
                            {loading ? <PostLoader/> : 
                            <>
                                {data.get_group_user && <CreateGroupPost groupid={groupid} refetch={refetch}/>}
                                {(!data?.get_group?.closed || data?.get_group_user) && 
                                    (data.get_group_posts.length > 0
                                    ? <GroupPosts posts={data.get_group_posts} 
                                                  role={data?.get_group_user?.role} 
                                                  refetchPosts={refetch}
                                                />
                                    : <NoPosts/>)}
                            </>}
                        </div>
                        <div className='container-right' style={{width:'35%'}}>
                            {!loading && <InfoBox data={data.get_group} membersCount={data.get_group_members.length} user={data.get_group_user}/>}
                        </div>
                </div>
            </div>
        </>
    )
}

export default memo(Group)

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
        get_group_posts (groupID: $gid, limit: $limit, offset: $offset){
            groupID
            postID
            post_text
            date_posted
            url
            userID
            first_name
            last_name
            username
            profile_picture
            type
        }
        get_group_user (groupID: $gid, userID: $uid){
            role
        }
        get_group_members(groupID:$gid){
            userID
        }
    }
`
const styles = {
    locked:{
        color:'white',
        width:'100%',
        height:'200px'
    }
}