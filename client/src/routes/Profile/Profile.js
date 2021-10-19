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
        }
        user(userID: $userID){
            first_name
            last_name
            profile_picture
            username
            userID
        }
        count_posts(userID: $userID)
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

    const FETCH_INFO2 = gql`
    query posts ($userID: Int!){
        posts(userID: $userID){
            postID
            post_text
            date_posted
            url
        }
        count_posts(userID: $userID)
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

    const {loading, error, data, refetch} = useQuery(myprofile ? FETCH_INFO2 : FETCH_INFO, {
        variables: {userID: myprofile ? ls.userID : userID}
    })

    useEffect(()=>{
        if(userID === ls.userID) window.location.href = '/myprofile'
        refetch()
    }, [data, refetch, userID, ls.userID])
    
    if (loading) return <div>loading</div>
    if(error) return <div>Something went wrong</div> 
    
    const user = myprofile ? ls : data.user
    const posts = data.posts
    const count = data.count_posts
    const followers = data.getFollowers
    const following = data.getFollowing


    const info = {
        user: user,
        count:count,
        followers: followers,
        following: following
    }
    
    return (
        <>
            <Navbar/>
            <div className='wrapper'> 
                <div className='main'>
                    <LeftNavbar/>
                    <div className='profile-container'>
                        <ProfileInfoBox user={user} count={count} info={info}/>
                        {myprofile && <AddPost width='70%'/>}
                        {posts.map(post => <Post width='70%' user={user} post={post} key={post.postID}/>)}       
                    </div>
                </div>
            </div>
        </> 
    )
}

export default Profile  


