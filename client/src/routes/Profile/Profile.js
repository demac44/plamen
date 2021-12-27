import React, { useEffect, useState, memo, useCallback } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Redirect } from 'react-router-dom'

import '../../App.css'
import '../../General.css'
import ProfileTopBox from '../../components/Profile/ProfileTopBox'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { useParams, useHistory } from 'react-router'
import Posts from '../../components/Post/Posts'

import '../../components/Groups/groups.css'
import '../../components/Profile/profile.css'
import CreatePost from '../../components/Post/Create post/CreatePost'
import Sidebar from '../../components/General components/Sidebar'
import AlternativeNavbar from '../../components/General components/AlternativeNavbar'
import SideInfoBox from '../../components/Profile/components/SideInfoBox'
import InterestsBox from '../../components/Profile/components/InterestsBox'
import PostLoader from '../../components/General components/Loaders/PostLoader'
import ProfileBoxLoader from '../../components/General components/Loaders/ProfileBoxLoader'

    
const Profile = ({isLogged}) => {
    const ls = JSON.parse(localStorage.getItem('user')) 
    const [myprofile, setMyProfile] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [userBlocked, setUserBlocked] = useState(false)
    const history = useHistory()
    const {username} = useParams()

    
    const {loading, error, data, refetch, fetchMore} = useQuery(FETCH_INFO, {
        variables: {
            username: username===ls.username ? ls.username : username,
            limit:20,
            offset:0,
            userID: ls.userID
        }
    })

    const isBlockedCB = useCallback(val => {
        setUserBlocked(val)
    }, [])

    
    useEffect(()=>{
        setIsLoading(true)
        if(username===ls.username) {
            setMyProfile(true)
        } else {
            setMyProfile(false)
        }
        window.scrollTo(0,0)
        setIsLoading(false)
        return null
    }, [username, ls.username, refetch, history, myprofile])


    if(!loading){
        if(!data?.get_user?.userID) return <Redirect to='/404'/>
    }
    if(error) throw error 

    const scrollPagination = () => {
        window.onscroll = async ()=>{
            if(Math.round(window.scrollY+window.innerHeight) >= document.body.scrollHeight-100){
                try {
                   await fetchMore({
                        variables:{
                            offset:data?.get_profile_posts?.length,
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;
                            return Object.assign({}, prev, {
                              get_profile_posts: [...data?.get_profile_posts, ...fetchMoreResult.get_profile_posts]
                            });
                          }
                    })                 
                } catch {}
            }
        }
    }

    return ( 
        <>
            <Navbar isLogged={isLogged}/>
            <AlternativeNavbar/>
            <div className='wrapper wrapper-profile' onLoad={scrollPagination}> 
                <div className='container-profile'>
                   {(loading || isLoading) ? <ProfileBoxLoader/> 
                            : <ProfileTopBox 
                                user={data.get_user}
                                myprofile={myprofile} 
                                postsLength={data.get_profile_posts.length}
                                isBlockedCB={isBlockedCB}
                            />}
                </div>
                <div className='container-main'  style={{paddingTop:'10px'}}>
                    <Sidebar/>
                    {userBlocked ? '' : 
                    <>
                        <div className='container-left'>
                            {(loading || isLoading) ? <PostLoader/> :
                            <>
                                {myprofile && <CreatePost refetch={refetch}/>}    
                                <Posts posts={data?.get_profile_posts} refetchPosts={refetch}/>  
                            </>}
                        </div>
                        <div className='container-right' style={{width:'35%', paddingTop:'10px', display:'block'}}>
                            {(loading || isLoading) ? '' :
                            <>
                                <SideInfoBox myprofile={myprofile} userID={data?.get_user?.userID}/>
                                <InterestsBox myprofile={myprofile} userID={data?.get_user?.userID}/>
                            </>
                            }
                        </div>
                    </>}
                </div>
            </div>
        </> 
    )
}

export default memo(Profile)  



const FETCH_INFO= gql`
    query ($limit: Int, $offset: Int, $username: String!, $userID: Int!){
        get_profile_posts (limit: $limit, offset: $offset, username: $username){
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
        get_user(username: $username, userID: $userID){
            first_name
            last_name
            profile_picture
            username
            userID
            last_seen
        }
    }
`
