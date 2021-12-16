import React, { useEffect, useState, memo } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Redirect } from 'react-router-dom'

import '../../App.css'
import '../../General.css'
import ProfileTopBox from '../../components/Profile/ProfileTopBox'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { useParams, useHistory } from 'react-router'
import ProfileLoader from '../../components/General components/Loaders/ProfileLoader'
import Posts from '../../components/Post/Posts'

import '../../components/Groups/groups.css'
import '../../components/Profile/profile.css'
import CreatePost from '../../components/Post/Create post/CreatePost'
import Sidebar from '../../components/General components/Sidebar'
import AlternativeNavbar from '../../components/General components/AlternativeNavbar'
import SideInfoBox from '../../components/Profile/components/SideInfoBox'
import InterestsBox from '../../components/Profile/components/InterestsBox'
import UserSuggestionsBox from '../../components/General components/UserSuggestionsBox'

    
const Profile = ({isLogged}) => {
    const ls = JSON.parse(localStorage.getItem('user')) 
    const [myprofile, setMyProfile] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const history = useHistory()
    const {username} = useParams()

    
    const {loading, error, data, refetch, fetchMore} = useQuery(FETCH_INFO, {
        variables: {
            username: username===ls.username ? ls.username : username,
            limit:20,
            offset:0
        }
    })
    
    useEffect(()=>{
        if(username===ls.username) {
            setMyProfile(true)
            setIsLoading(false)
        } else {
            setMyProfile(false)
            setIsLoading(false)
        }
        window.scrollTo(0,0)
        return null
    }, [username, ls.username, refetch, history, myprofile])

    
    if (loading || isLoading) return <ProfileLoader/>
    if(error) throw error 
    
    if(!data?.get_user?.username) return <Redirect to='/404'/>

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
                    <ProfileTopBox userID={data.get_user.userID} myprofile={myprofile} postsLength={data.get_profile_posts.length}/>
                </div>
                <div className='container-main'  style={{paddingTop:'10px'}}>
                    <Sidebar/>
                    <div className='container-left'>
                        {myprofile && <CreatePost refetch={refetch}/>}    
                        <Posts posts={data?.get_profile_posts} refetchPosts={refetch}/>  
                    </div>
                    <div className='container-right' style={{width:'35%', paddingTop:'10px', display:'block'}}>
                        <SideInfoBox myprofile={myprofile} userID={data.get_user.userID}/>
                        <InterestsBox myprofile={myprofile} userID={data.get_user.userID}/>
                    </div>
                </div>
            </div>
        </> 
    )
}

export default memo(Profile)  



const FETCH_INFO= gql`
    query ($limit: Int, $offset: Int, $username: String!){
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
        get_user(username: $username){
            first_name
            last_name
            profile_picture
            username
            userID
        }
    }
`
