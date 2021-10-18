import React, { useEffect } from 'react'
import Navbar from '../../../components/Navbar/Navbar'

import '../../../App.css'
import '../../../General.css'
import LeftNavbar from '../../../components/UI/LeftNavbar'
import ProfileInfoBox from '../../../components/Profile/ProfileInfoBox'
import AddPost from '../../../components/Feed/Posts/Post components/Functional components/AddPost'
import Post from '../../../components/Feed/Posts/Post'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'


const FETCH_INFO = gql`
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
            first_name
            last_name}
    }
` 

const MyProfile = () => {
    const ls = JSON.parse(localStorage.getItem('user')) 

    const {loading, error, data, refetch} = useQuery(FETCH_INFO, {  
        variables: {userID: ls.userID} 
    })

    useEffect(()=>{
        refetch()
    }, [data, refetch])

    if (loading) return <div>loading</div>
    if(error) return <div>Something went wrong</div>

    const posts = data.posts
    const count = data.count_posts
    const followers = data.

    return (
        <>
            <Navbar/>
            <div className='wrapper'> 
                <div className='main'>
                    <LeftNavbar/>
                    <div className='profile-container'>
                        <ProfileInfoBox user={ls} count={count}/>
                        <AddPost width='70%' user={ls}/>
                        {posts.map(post => <Post width='70%' user={ls} post={post} key={post.postID}/>)}       
                    </div>
                </div>
            </div>
        </> 
    )
}

export default MyProfile  


