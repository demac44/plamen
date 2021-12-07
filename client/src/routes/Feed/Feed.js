import React, { useCallback, useEffect, useState } from 'react'
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

const Feed = ({isLogged}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [updated, setUpdated] = useState(false)
    const [leftnav, setLeftnav] = useState(false)
    const {loading, data, error, refetch, fetchMore} = useQuery(FEED_POSTS, {
        variables: {
            userID: ls.userID,
            limit:20,
            offset:0
        },
        
    })
    

    useEffect(()=>{
        window.scrollTo(0,0)
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
            <Navbar callback={leftNavCallback} isLogged={isLogged}/>
            <AlternativeNavbar/>
            <div className='wrapper' onLoad={scrollPagination}>
                <div className='container-main'>
                    <Sidebar show={leftnav}/>
                    <div className='container-left'>
                        <Stories stories={data?.get_stories} updatedCallback={updatedCallback}/>
                        <CreatePost/>
                        <Posts posts={data.get_feed_posts}/>
                    </div>
                    <div className='container-right'>
                        <MyGroupsList/>
                    </div>
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