import React, { useEffect, memo } from 'react'
import Navbar from '../../components/Navbar/Navbar'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import MyGroupsList from '../../components/General components/MyGroupsList'
import Posts from '../../components/Post/Posts'
import CreatePost from '../../components/Post/Create post/CreatePost'

import Stories from '../../components/Stories/Stories'
import Sidebar from '../../components/General components/Sidebar'

import AlternativeNavbar from '../../components/General components/AlternativeNavbar'
import NoPosts from '../../components/General components/NoPosts'
import UserSuggestionsBox from '../../components/General components/UserSuggestionsBox'
import StoriesLoader from '../../components/General components/Loaders/StoriesLoader'
import PostLoader from '../../components/General components/Loaders/PostLoader'
import { useSelector } from 'react-redux'
import EmailConfirmWarning from '../../components/General components/EmailConfirmWarning'

const Feed = ({isLogged}) => {
    const uid = useSelector(state => state.isAuth.user?.userID)
    const {loading, data, error, refetch, fetchMore} = useQuery(FEED_POSTS, {
        variables: {
            userID: uid,
            limit:20,
            offset:0
        },
        pollInterval:1500000
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
        <div className='section-main'>
            <Navbar isLogged={isLogged}/>
            <AlternativeNavbar/>
            <div className='wrapper' onLoad={scrollPagination}>
                <div className='container-main'>
                    <Sidebar/>
                    <div className='container-left'>
                        {!loading && (!data?.confirmed_email_check && <EmailConfirmWarning/>)}
                        {loading ? <StoriesLoader/> : <Stories stories={data?.get_stories} refetch={refetch}/>}
                        {loading ? <PostLoader/> : 
                        <>
                            <CreatePost refetch={refetch}/>
                            {data.get_feed_posts.length > 0 ? <Posts posts={data.get_feed_posts} refetchPosts={refetch}/>
                                : <NoPosts/>}
                        </>}
                    </div>
                </div>
                <div className='container-right'>
                    <MyGroupsList/>
                    <UserSuggestionsBox/>
                </div>
            </div>
        </div>
    )
}

export default memo(Feed)


const FEED_POSTS = gql`
    query ($userID: Int!, $limit: Int, $offset: Int){
        confirmed_email_check(userID: $userID)
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