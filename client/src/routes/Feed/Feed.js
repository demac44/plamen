import React, { useEffect } from 'react'
import Post from '../../components/Feed/Posts/Post'
import Stories from '../../components/Feed/Stories/Stories'
import AddPost from '../../components/Feed/Posts/Post components/Functional components/AddPost'
import Navbar from '../../components/Navbar/Navbar'
import LeftNavbar from '../../components/UI/LeftNavbar'

import {gql} from 'graphql-tag'
import { useQuery,useLazyQuery } from 'react-apollo'


const FEED_POSTS = gql`
    query ($userID: Int!){
        feed_posts (userID: $userID){
            postID
            post_text
            date_posted
            url
            userID
            first_name
            last_name
            username
            profile_picture
            comments{
                commentID
                userID
                username
                comment_text
                date_commented
                profile_picture
            }
        }
    }
`

const Feed = () => {
    const ls = JSON.parse(localStorage.getItem('user'))

    const {loading, data,error, refetch} = useQuery(FEED_POSTS, {
        variables: {userID: ls.userID},
    })


    useEffect(()=>{
        refetch()
    }, [data, refetch])

    if(loading) return <p>Loading</p>
    if(error) console.log(error);


    const posts = data.feed_posts

    return (
        <>
            <Navbar/>
            <div className='main'>
                <LeftNavbar/>
                <div className='posts-container-feed'>
                    <Stories/>
                    <AddPost width='100%'/>
                    {posts.map(post => <Post post={{
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
                    key={post.postID}/>)}
                </div>
            </div>
        </>
    )
}

export default Feed
