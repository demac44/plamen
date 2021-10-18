import React, { useEffect } from 'react'
import Navbar from '../../../components/Navbar/Navbar'

import '../../../App.css'
import '../../../General.css'
import LeftNavbar from '../../../components/UI/LeftNavbar'
import ProfileInfoBox from '../../../components/Profile/ProfileInfoBox'
import Post from '../../../components/Feed/Posts/Post'
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
    }`

    
const Profile = () => {

    const {id} = useParams()

    let userID = parseInt(id)

    const {loading, error, data, refetch} = useQuery(FETCH_INFO, {
        variables: {userID: userID}
    })

    useEffect(()=>{
        refetch()
    }, [data])
    
    if (loading) return <div>loading</div>
    if(error) return <div>Something went wrong</div> 
    
    const user = data.user
    const posts = data.posts
    const count = data.count_posts
    
    return (
        <>
            <Navbar/>
            <div className='wrapper'> 
                <div className='main'>
                    <LeftNavbar/>
                    <div className='profile-container'>
                        <ProfileInfoBox user={user} count={count}/>
                        {posts.map(post => <Post width='70%' user={user} post={post} key={post.postID}/>)}       
                    </div>
                </div>
            </div>
        </> 
    )
}

export default Profile  


