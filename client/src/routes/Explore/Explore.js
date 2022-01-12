import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './style.css'
import {gql} from 'graphql-tag'
import { useQuery, useMutation } from 'react-apollo'
import MyGroupsList from '../../components/General components/MyGroupsList'
import Posts from '../../components/Post/Posts'
import Sidebar from '../../components/General components/Sidebar'
import AlternativeNavbar from '../../components/General components/AlternativeNavbar'
import PostLoader from '../../components/General components/Loaders/PostLoader'
import { useSelector } from 'react-redux'

const Explore = ({isLogged}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [set_last_seen] = useMutation(SET_LAST_SEEN)
    const {loading, data, refetch, fetchMore} = useQuery(RANDOM_POSTS, {
        variables:{
            uid,
            limit: 20,
            offset: 0
        }
    })
    
    useEffect(()=>{
        window.scrollTo(0,0)
        set_last_seen({variables:{userID: uid}})
    }, [set_last_seen, uid])

    const scrollPagination = () => {
        window.onscroll = async ()=>{
            if(Math.round(window.scrollY+window.innerHeight) >= document.body.scrollHeight-100){
                try {
                    await fetchMore({
                        variables:{
                            offset:data?.random_posts?.length,
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;
                            return Object.assign({}, prev, {
                              random_posts: [...data.random_posts, ...fetchMoreResult?.random_posts]
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
                        <div className='section-title flex-ctr'><h2>Explore</h2></div>
                        {loading ? <PostLoader/> : <Posts posts={data?.random_posts} refetchPosts={refetch}/>}
                    </div>
                </div>
                <div className='container-right'>
                    <MyGroupsList/>
                </div>
            </div>
        </div>
    )
}

export default Explore

const RANDOM_POSTS = gql`
    query($uid: Int!, $limit: Int, $offset: Int){
        random_posts(userID: $uid, limit: $limit, offset: $offset){
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
    }
`

const SET_LAST_SEEN = gql`
mutation ($userID: Int){
set_last_seen (userID: $userID){
  userID
}
}

`