import React, { useEffect, useCallback, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'

import '../../App.css'
import '../../General.css'
import ProfileTopBox from '../../components/Profile/ProfileTopBox'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { useParams, useHistory } from 'react-router'
import ProfileLoader from '../../components/General components/Loaders/ProfileLoader'
import Posts from '../../components/Post/Posts'
import MyGroupsList from '../../components/General components/MyGroupsList'

import '../../components/Groups/groups.css'
import '../../components/Profile/profile.css'
import CreatePost from '../../components/Post/Create post/CreatePost'
import Sidebar from '../../components/General components/Sidebar'
import AlternativeNavbar from '../../components/General components/AlternativeNavbar'

    
const Profile = ({myprofile, isLogged}) => {
    const ls = JSON.parse(localStorage.getItem('user')) 
    const [updated, setUpdated] = useState(false)
    const [leftnav, setLeftnav] = useState(false)
    const history = useHistory()
    const {id} = useParams()
    
    const userID = parseInt(id)
    
    const getUser = useQuery(GET_USER, {
        variables: {userID: userID},
        skip: myprofile
    })

    const {loading, error, data, refetch, fetchMore} = useQuery(FETCH_INFO, {
        variables: {
            userID: myprofile ? ls.userID : userID,
            limit:20,
            offset:0
        }
    })
    
    const leftNavCallback = useCallback(val =>{
        setLeftnav(val)
    }, [setLeftnav])

    useEffect(()=>{
        if(userID === ls.userID) history.push('/myprofile')
        window.scrollTo(0,0)
    }, [userID, ls.userID, updated, refetch])
    
    if (loading) return <ProfileLoader/>
    if(error) throw error 
    
    const info = {
        user: myprofile ? ls : getUser?.data?.get_user,
        count: data.get_profile_posts.length,
        followers: data.get_followers,
        following: data.get_following,
        stories: data.get_user_stories
    }

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
            <Navbar callback={leftNavCallback} isLogged={isLogged}/>
            <AlternativeNavbar/>
            <div className='wrapper' onLoad={scrollPagination}> 
                <div className='container-profile'>
                    <ProfileTopBox info={info}/>
                </div>
                <div className='container-main'>
                    <Sidebar show={leftnav}/>
                    <div className='container-left'>
                        {myprofile && <CreatePost/>}    
                        <Posts posts={data?.get_profile_posts}/>  
                    </div>
                    <div className='container-right'>
                        <MyGroupsList/>
                    </div>
                </div>
            </div>
        </> 
    )
}

export default Profile  



const FETCH_INFO= gql`
    query ($userID: Int!, $limit: Int, $offset: Int){
        get_profile_posts (userID: $userID, limit: $limit, offset: $offset){
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
        get_followers(followedID: $userID){
            userID
            username
            first_name
            last_name
            profile_picture
        }
        get_following(followerID: $userID){
            userID
            username
            first_name
            last_name
            profile_picture
        }
        get_user_stories (userID: $userID){
            first_name
            last_name
            userID
            profile_picture
            storyID
            type
            url
            date_posted
        } 
    }`

const GET_USER = gql`
    query ($userID: Int){
        get_user(userID: $userID){
            first_name
            last_name
            profile_picture
            username
            userID
        }
    }
`