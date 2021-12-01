import React, { useCallback, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import LeftNavbar from '../../components/UI/LeftNavbar'
import { useParams } from 'react-router-dom'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import GroupBanner from '../../components/Groups/components/GroupBanner'
import AddGroupPost from '../../components/Groups/Functional components/AddGroupPost'
import Post from '../../components/Feed/Posts/Post'

const GET_GROUP = gql`
    query($gid: Int!, $limit: Int, $offset: Int){
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
    }
`

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
            offset:0
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
                        <div className='tags-box'>
                            {tags.map(tag => <div
                                style={styles.tag}
                                key={tag}
                            >{tag}</div>)}
                        </div>
                        <div className='group-posts-info'>
                            <div className='group-posts'>
                                <AddGroupPost updatedCallback={updatedCallback} groupid={groupid}/>
                                {posts?.length > 0 ? posts?.map(post => <Post post={{
                                    postID: post.postID,
                                    post_text: post.post_text,
                                    date_posted: post.date_posted,
                                    url: post.url,
                                }} user={{
                                    userID: post.userID,
                                    first_name:post.first_name,
                                    last_name: post.last_name,
                                    username: post.username,
                                    profile_picture: post.profile_picture
                                }} comments={post.comments}
                                likes={post.likes}
                                updatedCallback={updatedCallback}
                                key={post.postID}/>) : <p style={{marginTop:'60px', color:'black', textAlign:'center', width:'70%'}}>No new posts</p>}
                            </div>
                            <div className='group-info-box'></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Group


const styles = {
    tag:{
        padding:'5px 10px',
        backgroundColor:'#13306e',
        fontSize:'14px',
        color:'white',
        height:'fit-content',
        borderRadius:'20px',
        marginTop:'5px',
        marginLeft:'5px'
    }
}