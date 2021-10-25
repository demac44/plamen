import React, { useCallback, useEffect, useState } from 'react'
import Post from '../../components/Feed/Posts/Post'
import Stories from '../../components/Feed/Stories/Stories'
import AddPost from '../../components/Feed/Posts/Post components/Functional components/AddPost'
import Navbar from '../../components/Navbar/Navbar'
import LeftNavbar from '../../components/UI/LeftNavbar'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'


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
    }
`

const Feed = () => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [updated, setUpdated] = useState(false)

    const {loading, data, error, refetch, fetchMore} = useQuery(FEED_POSTS, {
        variables: {
            userID: ls.userID,
            
        },
    })

    useEffect(()=>{
        if(updated){
            refetch()
            setUpdated(false)
        }
    }, [updated, refetch])


    const updatedCallback = useCallback(val => {
        setUpdated(val)
    }, [setUpdated])

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
                    <AddPost width='100%' callback={updatedCallback}/>
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
                    likes={post.likes}
                    callback={updatedCallback}
                    key={post.postID}/>)}
                </div>
            </div>
        </>
    )
}

export default Feed
