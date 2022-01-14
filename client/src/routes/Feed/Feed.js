import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'

import {gql} from 'graphql-tag'
import { useQuery, useMutation } from 'react-apollo'
import MyGroupsList from '../../components/General components/MyGroupsList'
import Posts from '../../components/Post/Posts'
import CreatePost from '../../components/Post/Create post/CreatePost'

import Stories from '../../components/Stories/Stories'
import Sidebar from '../../components/General components/Sidebar'

import AlternativeNavbar from '../../components/General components/AlternativeNavbar'
import NoPosts from '../../components/General components/NoPosts'
import { useSelector } from 'react-redux'
import EmailConfirmWarning from '../../components/General components/Confirm email/EmailConfirmWarning'

const Feed = () => {
    const uid = useSelector(state => state.isAuth.user?.userID)
    const [seenStories, setSeenStories] = useState([])
    const [set_last_seen] = useMutation(SET_LAST_SEEN)
    const {loading, data, error, refetch, fetchMore} = useQuery(FEED_POSTS, {
        variables: {
            userID: uid,
            limit:20,
            offset:0
        }
    })
    
    useEffect(()=>{
        setSeenStories(()=>{
            let arr = [];
            data?.get_seen_stories?.map(s => ({
                p: arr.push(s?.storyID)
            }))
            return arr;
        })
        set_last_seen({variables:{userID: uid}})
    }, [data, set_last_seen, uid])

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
            <Navbar/>
            <AlternativeNavbar/>
            <div className='wrapper' onLoad={scrollPagination}>
                <div className='container-main'>
                    <Sidebar/>
                    <div className='container-left'>
                        {!loading && (!data?.confirmed_email_check && <EmailConfirmWarning/>)}

                        <Stories seenStories={seenStories} stories={data?.get_stories} refetch={refetch}/>

                        <CreatePost refetch={refetch}/>

                        {data?.get_feed_posts.length > 0 ? <Posts posts={data?.get_feed_posts} loading={loading} refetchPosts={refetch}/>
                            : <NoPosts/>}
                    </div>
                </div>
                <div className='container-right'>
                    <MyGroupsList/>
                </div>
            </div>
        </div>
    )
}

export default Feed


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
        get_seen_stories(userID: $userID){
            storyID
        }
    }
`
const SET_LAST_SEEN = gql`
    mutation ($userID: Int){
        set_last_seen (userID: $userID){
        userID
    }
}

`

