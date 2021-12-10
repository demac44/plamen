import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import MyGroupsList from '../../components/General components/MyGroupsList'
import Posts from '../../components/Post/Posts'
import CreatePost from '../../components/Post/Create post/CreatePost'

import Stories from '../../components/Stories/Stories'
import Sidebar from '../../components/General components/Sidebar'

import FeedLoader from '../../components/General components/Loaders/FeedLoader'
import AlternativeNavbar from '../../components/General components/AlternativeNavbar'
import { Link } from 'react-router-dom'
import NoPosts from '../../components/General components/NoPosts'

const Feed = ({isLogged}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const {loading, data, error, refetch, fetchMore} = useQuery(FEED_POSTS, {
        variables: {
            userID: ls.userID,
            limit:20,
            offset:0
        },
        
    })

    useEffect(()=>{
        window.scrollTo(0,0)
    }, [])

    if(loading) return <FeedLoader/>
    if(error) console.log(error); 


    const scrollPagination = () => {
        window.onscroll = async ()=>{
            if(Math.round(window.scrollY+window.innerHeight) >= document.body.scrollHeight-100){
                try {
                    await fetchMore({
                        variables:{
                            offset:data?.get_feed_posts?.length,
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;
                            return Object.assign({}, prev, {
                              get_feed_posts: [...data.get_feed_posts, ...fetchMoreResult?.get_feed_posts]
                            });
                          }
                    })
                } catch{}
            }
        }
    }

    return (
        <>
            <Navbar isLogged={isLogged}/>
            <AlternativeNavbar/>
            <div className='wrapper' onLoad={scrollPagination}>
                <div className='container-main'>
                    <Sidebar/>
                    <div className='container-left'>
                        <Stories stories={data?.get_stories} refetch={refetch}/>
                        <CreatePost refetch={refetch}/>
                        {data.get_feed_posts.length > 0 ? <Posts posts={data.get_feed_posts} refetchPosts={refetch}/>
                            : <NoPosts/>}
                    </div>
                </div>
                <div className='container-right' style={styles.containerRight}>
                    <MyGroupsList/>
                </div>
            </div>
        </>
    )
}

export default Feed


const FEED_POSTS = gql`
    query ($userID: Int!, $limit: Int, $offset: Int){
        get_feed_posts (userID: $userID, limit: $limit, offset: $offset){
            postID
            post_text
            date_posted
            url
            userID
            first_name
            last_name
            username
            profile_picture
            type
        }
        get_stories (userID: $userID){
            first_name
            last_name
            storyID
            type
            profile_picture
            username
            userID
            stories {
                date_posted
                storyID
                url
                type
            }
        }
    }
`

const styles = {
    containerRight:{
        position:'fixed', 
        top:'80px', 
        right:'10px', 
        padding:'0 10px'
    }
}