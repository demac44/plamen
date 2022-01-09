import React, { useEffect, useState, memo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import '../../components/Groups/groups.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import Navbar from '../../components/Navbar/Navbar'
import GroupBanner from '../../components/Groups/components/GroupBanner'
import InfoBox from '../../components/Groups/components/InfoBox'
import TagsBox from '../../components/General components/TagsBox'
import Sidebar from '../../components/General components/Sidebar'
import AlternativeNavbar from '../../components/General components/AlternativeNavbar'
import CreateGroupPost from '../../components/Groups/Post/Create post/CreateGroupPost'
import GroupNavbar from '../../components/Groups/components/GroupNavbar'
import GroupPosts from '../../components/Groups/Post/GroupPosts'
import NoPosts from '../../components/General components/NoPosts'
import BannerLoader from '../../components/General components/Loaders/BannerLoader'
import PostLoader from '../../components/General components/Loaders/PostLoader'

const Group = ({isLogged}) => {
    const {groupid} = useParams()
    const [tags, setTags] = useState([])
    const uid = useSelector(state => state.isAuth.user?.userID)
    const {data, loading, refetch, fetchMore} = useQuery(GET_GROUP, {
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

    
    const scrollPagination = () => {
        window.onscroll = async ()=>{
            if(Math.round(window.scrollY+window.innerHeight) >= document.body.scrollHeight-100){
                try {
                    await fetchMore({
                        variables:{
                            offset:data?.get_group_posts?.length,
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;
                            return Object.assign({}, prev, {
                              get_group_posts: [...data.get_group_posts, ...fetchMoreResult?.get_group_posts]
                            });
                          }
                    })
                } catch{}
            }
        }
    }

    return (
        <>
            <Navbar isLogged={isLogged}/> 
            <AlternativeNavbar/>
            <div className='wrapper wrapper-community' onLoad={scrollPagination}>
                <Sidebar/>
                <div className='container-main' style={{paddingTop:'0'}}>
                        <div className='container-left'>
                            {loading ? <BannerLoader/> : <GroupBanner info={data?.get_group} user={data.get_group_user}/>}
                            <GroupNavbar groupid={groupid} role={data?.get_group_user?.role}/>
                            {!loading && <TagsBox tags={tags}/>}  
                            
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
                        <div className='container-right'>
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
        get_group_posts (groupID: $gid, limit: $limit, offset: $offset, userID: $uid){
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