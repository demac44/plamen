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
                        <div className='tags-box'>
                            {tags.map(tag => <div
                                style={styles.tag}
                                key={tag}
                            >{tag}</div>)}
                        </div>
                        {(data.get_group_user && !data.get_group.closed) &&
                        <div className='group-posts-info'>
                            <div className='group-posts-container'>
                                <AddGroupPost updatedCallback={updatedCallback} groupid={groupid}/>
                                {posts?.length > 0 ? posts?.map(post => <Post post={{
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
                                key={post.postID}/>) : <p style={{marginTop:'60px', color:'black', textAlign:'center', width:'70%'}}>No new posts</p>}
                            </div>
                            <div className='group-info-container'>
                                <div className='group-info-box flex-col-ctr'>
                                    <div style={styles.descTitle}><h2>Description</h2></div>
                                    {data.get_group.group_description ? 
                                    <div style={styles.textBoxDesc}>{data.get_group.group_description}</div>
                                        : <div style={styles.addInfoBtn}><i className='fas fa-plus' style={{marginRight:'10px'}}></i><h3> Add description</h3></div>}               
                                </div>
                                <div className='group-info-box flex-col-ctr'>
                                    <div style={styles.descTitle}><h2>Community rules</h2></div>
                                    {data.get_group.group_rules ? 
                                    <div style={styles.textBoxDesc}><p>{data.get_group.group_rules}</p></div>
                                        : <div className='flex-ctr' style={styles.addInfoBtn}><i style={{marginRight:'5px'}} className='fas fa-plus'></i> <h3> Add rules</h3></div>}       
                                </div>
                            </div>
                        </div>}
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
        backgroundColor:'teal',
        fontSize:'14px',
        color:'white',
        height:'fit-content',
        borderRadius:'20px',
        marginTop:'5px',
        marginLeft:'5px'
    },
    descTitle:{
        width:'100%',
        padding:'5px',
        textAlign:'center',
        color:'white'
    },
    textBoxDesc:{
        width:'100%',
        height:'fit-content',
        backgroundColor:'white',
        padding:'5px',
        wordWrap:'break-word'
    },
    addInfoBtn:{
        width:'100%',
        padding:'10px',
        borderRadius:'10px',
        backgroundColor:'#2f2f2f',
        textAlign:'center',
        color:'white',
        cursor:'pointer'
    }
}