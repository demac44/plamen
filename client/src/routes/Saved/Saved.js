import React, {useEffect, memo} from 'react'
import { useSelector } from 'react-redux';
import gql from 'graphql-tag'
import { useQuery, useMutation } from 'react-apollo'
import Navbar from '../../components/Navbar/Navbar'
import MyGroupsList from '../../components/General components/MyGroupsList'
import Posts from '../../components/Post/Posts'
import Sidebar from '../../components/General components/Sidebar'
import AlternativeNavbar from '../../components/General components/AlternativeNavbar'
import NoPosts from '../../components/General components/NoPosts'
import PostLoader from '../../components/General components/Loaders/PostLoader'

const Saved = () => {
    const uid = useSelector(state => state.isAuth.user?.userID)
    const [set_last_seen] = useMutation(SET_LAST_SEEN)
    const {loading, data, fetchMore, refetch} = useQuery(GET_SAVED, { 
        variables: {
            userID: uid,
            offset:0,
            limit:15
        },
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
                            offset:data.get_saved_posts.length,
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;
                            return Object.assign({}, prev, {
                              get_saved_posts: [...data.get_saved_posts, ...fetchMoreResult.get_saved_posts]
                            });
                          }
                    })
                } catch {}
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
                        <h2 className='section-title flex-ctr'>Saved posts</h2>
                        {loading ? <PostLoader/> : (data.get_saved_posts.length > 0 ? <Posts posts={data.get_saved_posts} refetchPosts={refetch}/>
                            : <NoPosts/>)}
                    </div>
                </div>
                <div className='container-right'>
                    <MyGroupsList/>
                </div>
            </div>
        </div>
    )
}

export default memo(Saved)

const GET_SAVED = gql`
    query ($userID: Int!, $offset: Int, $limit: Int){
        get_saved_posts(userID:$userID, offset:$offset, limit:$limit){
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