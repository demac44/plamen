import React, { useEffect, useCallback, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'

import '../../App.css'
import '../../General.css'
import LeftNavbar from '../../components/UI/LeftNavbar'
import ProfileInfoBox from '../../components/Profile/ProfileInfoBox'
import AddPost from '../../components/Feed/Posts/Post components/Functional components/AddPost'
import Post from '../../components/Feed/Posts/Post'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { useParams } from 'react-router'
import Loader from '../../components/UI/Loader'

const FETCH_INFO= gql`
    query ($userID: Int!){
        posts(userID: $userID){
            postID
            post_text
            date_posted
            url
            comments{
                commentID
                userID
                username
                comment_text
                date_commented
                profile_picture
            }
            likes{
                likeID
                postID
                userID
                username
                first_name
                last_name
                profile_picture
            }
        }
        user(userID: $userID){
            first_name
            last_name
            profile_picture
            username
            userID
        }
        getFollowers(followedID: $userID){
            userID
            username
            first_name
            last_name
            profile_picture
        }
        getFollowing(followerID: $userID){
            userID
            username
            first_name
            last_name
            profile_picture
        }
    }`

    const FETCH_INFO_MYPROFILE = gql`
    query posts ($userID: Int!){
        posts(userID: $userID){
            postID
            post_text
            date_posted
            url
            comments{
                commentID
                userID
                username
                comment_text
                date_commented
                profile_picture
            }
            likes{
                likeID
                postID
                userID
                username
                first_name
                last_name
                profile_picture
            }
        }
        getFollowers(followedID: $userID){
            userID
            username
            first_name
            last_name
            profile_picture
        }
        getFollowing(followerID: $userID){
            userID
            username
            first_name
            last_name
            profile_picture
        }
    }
` 
    
const Profile = ({myprofile}) => {
    const ls = JSON.parse(localStorage.getItem('user')) 
    const [updated, setUpdated] = useState(false)
    const [leftnav, setLeftnav] = useState(false)
    
    const {id} = useParams()
    
    let userID = parseInt(id)

    const {loading, error, data, refetch} = useQuery(myprofile ? FETCH_INFO_MYPROFILE : FETCH_INFO, {
        variables: {userID: myprofile ? ls.userID : userID}
    })

    const updatedCallback = useCallback(val => {
        setUpdated(val)
    }, [setUpdated])
    
    const leftNavCallback = useCallback(val =>{
        setLeftnav(val)
    }, [setLeftnav])

    useEffect(()=>{
        if(userID === ls.userID) window.location.href = '/myprofile'
        if(updated){
            refetch()
            setUpdated(false)
        }
    }, [data, userID, ls.userID, updated, refetch])
    
    if (loading) return <div className='wh-100'><Loader/></div>
    if(error) return <div>Something went wrong</div> 
    
    const posts = data.posts

    const info = {
        user: myprofile ? ls : data.user,
        count: data.posts.length,
        followers: data.getFollowers,
        following: data.getFollowing
    }
    
    return ( 
        <>
            <Navbar callback={leftNavCallback}/>
            <div className='wrapper'> 
                <div className='main'>
                    <LeftNavbar show={leftnav}/>
                    <div className='profile-container'>
                        <ProfileInfoBox info={info}/>
                        {myprofile && <AddPost width='70%' callback={updatedCallback}/>}
                        {posts.length > 0 ? posts.map(post =><Post width='70%' 
                        user={info.user} 
                        comments={post.comments} 
                        likes={post.likes}
                        post={post}
                        callback={updatedCallback}
                         key={post.postID}/>) : <p style={{marginTop:'60px', width:'70%', textAlign:'center'}}>No posts</p>}       
                    </div>
                </div>
            </div>
        </> 
    )
}

export default Profile  


