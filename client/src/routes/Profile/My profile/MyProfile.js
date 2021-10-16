import React, { useEffect } from 'react'
import Navbar from '../../../components/Navbar/Navbar'

import '../../../App.css'
import '../../../General.css'
import LeftNavbar from '../../../components/UI/LeftNavbar'
import ProfileInfoBox from '../../../components/Profile/ProfileInfoBox'
import AddPost from '../../../components/Feed/Posts/Post components/Functional components/AddPost'
import TextPost from '../../../components/Feed/Posts/TextPost'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'


const POSTS_AND_USER = gql`
    query ($userID: Int!){
        posts(userID: $userID){
            tpostID
            post_content
            date_published
        }
    }
` 
const MyProfile = ({myprofile}) => {
    let ls = JSON.parse(localStorage.getItem('user')) 
    const {loading, error, data, refetch} = useQuery(POSTS_AND_USER, {
        variables: {userID: ls.userID}
    })

    useEffect(()=>{
        refetch()
    }, [data])

    if (loading) return <div>loading</div>
    if(error) return <div>Something went wrong</div>


    return (
        <>
            <Navbar/>
            <div className='wrapper'> 
                <div className='main'>
                    <LeftNavbar/>
                    <div className='profile-container'>
                        <ProfileInfoBox/>
                        <AddPost width='70%'/>
                        {data?.posts.map(post => <TextPost width='70%' post={post} key={post.tpostID}/>)}       
                    </div>
                </div>
            </div>
        </> 
    )
}

export default MyProfile  


