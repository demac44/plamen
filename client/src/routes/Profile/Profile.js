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
import ProfileLoader from '../../components/UI/Loaders/ProfileLoader'

    
const Profile = ({myprofile, isLogged}) => {
    const ls = JSON.parse(localStorage.getItem('user')) 
    const [updated, setUpdated] = useState(false)
    const [leftnav, setLeftnav] = useState(false)
    
    const {id} = useParams()
    
    const userID = parseInt(id)

    const {loading, error, data, refetch, fetchMore} = useQuery(myprofile ? FETCH_INFO_MYPROFILE : FETCH_INFO, {
        variables: {
            userID: myprofile ? ls.userID : userID,
            limit:20,
            offset:0
        }
    })

    const updatedCallback = useCallback(val => {
        setUpdated(val)
    }, [setUpdated])
    
    const leftNavCallback = useCallback(val =>{
        setLeftnav(val)
    }, [setLeftnav])

    useEffect(()=>{
        if(userID === ls.userID) window.location.href = '/myprofile'
        window.scrollTo(0,0)
        if(updated){
            refetch()
            setUpdated(false)
        }
    }, [userID, ls.userID, updated, refetch])
    
    if (loading) return <ProfileLoader/>
    if(error) throw error 
    
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
            <div className='wrapper' onLoad={()=>{
                window.onscroll = async ()=>{
                 if(Math.round(window.scrollY+window.innerHeight) >= document.body.scrollHeight-100){
                     try {
                        await fetchMore({
                             variables:{
                                 offset:posts.length,
                             },
                             updateQuery: (prev, { fetchMoreResult }) => {
                                 if (!fetchMoreResult) return prev;
                                 return Object.assign({}, prev, {
                                   posts: [...posts, ...fetchMoreResult.posts]
                                 });
                               }
                         })                 
                     } catch {}
                 }
                }
            }}> 
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



const FETCH_INFO= gql`
    query ($userID: Int!, $limit: Int, $offset: Int){
        posts(userID: $userID, limit: $limit, offset: $offset){
            postID
            post_text
            date_posted
            url
            userID
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
    query ($userID: Int!, $limit: Int, $offset: Int){
        posts(userID: $userID, limit: $limit, offset: $offset){
            postID
            post_text
            date_posted
            url
            userID
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