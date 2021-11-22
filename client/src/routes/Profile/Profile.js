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
        get_user_stories (userID: $userID){
            first_name
            last_name
            userID
            profile_picture
            storyID
            type
            url
            date_posted
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
        get_user_stories (userID: $userID){
            userID
            storyID
            type
            url
            date_posted
        }
    }
` 
    
const Profile = ({myprofile, isLogged}) => {
    const ls = JSON.parse(localStorage.getItem('user')) 
    const [updated, setUpdated] = useState(false)
    const [leftnav, setLeftnav] = useState(false)
    
    const {id} = useParams()
    
    const userID = parseInt(id)

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
        following: data.getFollowing,
        stories: data.get_user_stories
    }
    
    return ( 
        <>
            <Navbar callback={leftNavCallback} isLogged={isLogged}/>
            <div className='wrapper'> 
                <div className='main'>
                    <LeftNavbar show={leftnav}/>
                    <div className='profile-container'>
                        <ProfileInfoBox info={info} updatedCallback={updatedCallback}/>
                        {myprofile && <AddPost updatedCallback={updatedCallback}/>}
                        {posts.length > 0 ? posts.map(post =><Post 
                        user={info.user} 
                        comments={post.comments} 
                        likes={post.likes}
                        post={post}
                        updatedCallback={updatedCallback}
                         key={post.postID}/>) : <p style={{marginTop:'60px', textAlign:'center'}}>No posts</p>}       
                    </div>
                </div>
            </div>
        </> 
    )
}

export default Profile  


