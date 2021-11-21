import React, { useCallback, useEffect, useState } from 'react'
import Post from '../../components/Feed/Posts/Post'
import Stories from '../../components/Feed/Stories/Stories'
import AddPost from '../../components/Feed/Posts/Post components/Functional components/AddPost'
import Navbar from '../../components/Navbar/Navbar'
import LeftNavbar from '../../components/UI/LeftNavbar'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import Loader from '../../components/UI/Loader'


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
        get_stories (userID: $userID){
            storyID
            profile_picture
            first_name
            last_name
            userID
            type
            stories {
                storyID
                type
                url
                date_posted
            }
        }
    }
`

const Feed = ({isLogged}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [updated, setUpdated] = useState(false)
    const [leftnav, setLeftnav] = useState(false)
    const {loading, data, error, refetch} = useQuery(FEED_POSTS, {
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
    
    const leftNavCallback = useCallback(val =>{
        setLeftnav(val)
    }, [setLeftnav])
    
    if(loading) return <div className='wh-100'><Loader/></div>
    if(error) console.log(error); 

    const posts = data.feed_posts
    const stories = data.get_stories

    return (
        <>
            <Navbar callback={leftNavCallback} isLogged={isLogged}/>
            <div className='wrapper'>
                <div className='main'>
                    <LeftNavbar show={leftnav}/>
                    <div className='posts-container-feed'>
                        <Stories stories={stories} updatedCallback={updatedCallback}/>
                        <AddPost updatedCallback={updatedCallback}/>
                        {posts.length > 0 ? posts.map(post => <Post post={{
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
                        updatedCallback={updatedCallback}
                        key={post.postID}/>) : <p style={{marginTop:'60px', color:'black', textAlign:'center', width:'70%'}}>No new posts</p>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Feed
