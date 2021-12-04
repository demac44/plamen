import React, { useCallback, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import LeftNavbar from '../../components/UI/LeftNavbar'
import { useParams } from 'react-router-dom'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import GroupBanner from '../../components/Groups/components/GroupBanner'
import AddGroupPost from '../../components/Groups/Functional components/AddGroupPost'
import Post from '../../components/Feed/Posts/Post'
import InfoBox from '../../components/Groups/components/InfoBox'
import TagsBox from '../../components/Groups/components/TagsBox'


const Group = ({isLogged}) => {
    const {groupid} = useParams()
    const [leftnav, setLeftnav] = useState(false)
    const [updated, setUpdated] = useState(false)
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
        if(updated){
            refetch()
        }
        if(data){
            setTags(data.get_group.group_tags.split(','))
        }
    }, [refetch, updated, data])

    const leftNavCallback = useCallback(val =>{
        setLeftnav(val)
    }, [setLeftnav])

    const updatedCallback = useCallback(val => {
        setUpdated(val)
    }, [setUpdated])


    if(loading) return <p>loading</p>

    const posts = data?.get_group_posts

    return (
        <>
            <Navbar callback={leftNavCallback} isLogged={isLogged}/> 
            <div className='wrapper'>
                <div className='main'>
                    <LeftNavbar show={leftnav}/>
                    <div className='group-container'>
                        <GroupBanner info={data?.get_group}/>
                        <TagsBox tags={tags}/>                        
                        <div className='group-posts-info'>
                            <div className='group-posts-container'>
                                {data.get_group_user && <AddGroupPost updatedCallback={updatedCallback} groupid={groupid}/>}
                                
                                {(!data.get_group.closed || data.get_group_user) ? (posts?.length > 0 ? posts?.map(post => 
                                    <Post post={{
                                        postID: post.postID,
                                        post_text: post.post_text,
                                        date_posted: post.date_posted,
                                        url: post.url,
                                        type: post.type
                                    }} user={{
                                        userID: post.userID,
                                        first_name:post.first_name,
                                        last_name: post.last_name,
                                        username: post.username,
                                        profile_picture: post.profile_picture
                                    }} comments={post.comments}
                                    likes={post.likes}
                                    updatedCallback={updatedCallback}
                                    groupPost={true}
                                    gid={groupid}
                                    key={post.postID}/>) : <p style={styles.p}>No new posts</p>)
                                : <p style={styles.p}><i className='fas fa-lock'></i> Join to see community posts</p>}
                            </div>
                            <InfoBox data={data.get_group} user={data.get_group_user}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Group

const GET_GROUP = gql`
    query($gid: Int!, $limit: Int, $offset: Int, $uid: Int!){
        get_group(groupID: $gid){
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
            comments{
                commentID
                userID
                username
                comment_text
                date_commented
                profile_picture
                postID
            }
            likes{
                postID
                userID
                username
                first_name
                last_name
                profile_picture
            }
        }
        get_group_user (groupID: $gid, userID: $uid){
            role
            permissions
        }
    }
`
const styles = {
    p: {marginTop:'60px', 
        color:'white', 
        textAlign:'center', 
        width:'100%'}
}