import React, { useEffect } from 'react'
import Post from '../../components/Feed/Posts/Post'
import Stories from '../../components/Feed/Stories/Stories'
import AddPost from '../../components/Feed/Posts/Post components/Functional components/AddPost'
import Navbar from '../../components/Navbar/Navbar'
import LeftNavbar from '../../components/UI/LeftNavbar'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'


const FEED_POSTS = gql`
    query feed_posts ($userID: Int!){
        feed_posts (userID: $userID){
            postID
            post_text
            date_posted
            url
            userID
            first_name
            last_name
            username
        }
    }
`

const Feed = () => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const {loading, data, refetch} = useQuery(FEED_POSTS, {
        variables: {userID: ls.userID}
    })

    useEffect(()=>{
        refetch()
    }, [data, refetch])

    if(loading) return <p>Loading</p>

    const posts = data.feed_posts

    // const posts ={
    //     postID: data.feed_posts.postID,
    //     post_text: data.feed_posts.post_text,
    //     date_posted: data.feed_posts.date_posted,
    //     url: data.feed_posts.url
    // }
    // const user = {
    //     userID: data.feed_posts.userID,
    //     first_name:data.feed_posts.first_name,
    //     last_name: data.feed_posts.last_name,
    //     username: data.feed_posts.username
    // }

    return (
        <div>
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
                        url: post.url
                    }} user={{
                        userID: post.userID,
                        first_name:post.first_name,
                        last_name: post.last_name,
                        username: post.username
                    }}
                    key={post.postID}/>)}
                </div>
            </div>
        </div>
    )
}

export default Feed
