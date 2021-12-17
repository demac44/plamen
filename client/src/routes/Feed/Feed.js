import React, { useEffect, memo } from 'react'
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
import NoPosts from '../../components/General components/NoPosts'
import UserSuggestionsBox from '../../components/General components/UserSuggestionsBox'
import StoriesLoader from '../../components/General components/Loaders/StoriesLoader'
import PostLoader from '../../components/General components/Loaders/PostLoader'

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
                        {loading ? <StoriesLoader/> : <Stories stories={data?.get_stories} refetch={refetch}/>}
                        {loading ? <PostLoader/> : 
                        <>
                            <CreatePost refetch={refetch}/>
                            {data.get_feed_posts.length > 0 ? <Posts posts={data.get_feed_posts} refetchPosts={refetch}/>
                                : <NoPosts/>}
                        </>}
                    </div>
                </div>
                <div className='container-right' style={styles.containerRight}>
                    <MyGroupsList/>
                    <UserSuggestionsBox/>
                </div>
            </div>
        </>
    )
}

export default memo(Feed)


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
        right:'0', 
        padding:'0 10px',
        maxHeight: '85vh',
        overflowY: 'scroll',
        marginRight:'-17px'
    }
}