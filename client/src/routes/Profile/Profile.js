import React, { useEffect } from 'react'
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

    const {id} = useParams()

    let userID = parseInt(id)

    const {loading, error, data, refetch} = useQuery(myprofile ? FETCH_INFO_MYPROFILE : FETCH_INFO, {
        variables: {userID: myprofile ? ls.userID : userID}
    })

    useEffect(()=>{
        if(userID === ls.userID) window.location.href = '/myprofile'
        refetch()
    }, [data, refetch, userID, ls.userID])
    
    if (loading) return <div>loading</div>
    if(error) return <div>Something went wrong</div> 
    
    const posts = data?.posts

    const info = {
        user: myprofile ? ls : data.user,
        count: data.posts.length,
        followers: data.getFollowers,
        following: data.getFollowing
    }
    
    return ( 
        <>
            <Navbar/>
            <div className='wrapper'> 
                <div className='main'>
                    <LeftNavbar/>
                    <div className='profile-container'>
                        <ProfileInfoBox info={info}/>
                        {myprofile && <AddPost width='70%'/>}
                        {posts.map(post => <Post width='70%' 
                        user={info.user} 
                        comments={post.comments} 
                        post={post}
                         key={post.postID}/>)}       
                    </div>
                </div>
            </div>
        </> 
    )
}

export default Profile  


