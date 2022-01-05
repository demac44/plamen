import React, { useEffect, useState, memo, useCallback } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Redirect } from 'react-router-dom'
import '../../components/Profile/profile.css'
import ProfileTopBox from '../../components/Profile/Profile top box/ProfileTopBox'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { useParams, useHistory } from 'react-router'
import Posts from '../../components/Post/Posts'
import CreatePost from '../../components/Post/Create post/CreatePost'
import Sidebar from '../../components/General components/Sidebar'
import AlternativeNavbar from '../../components/General components/AlternativeNavbar'
import SideInfoBox from '../../components/Profile/Info boxes/SideInfoBox'
import InterestsBox from '../../components/Profile/Info boxes/InterestsBox'
import PostLoader from '../../components/General components/Loaders/PostLoader'
import ProfileBoxLoader from '../../components/General components/Loaders/ProfileBoxLoader'
import { useSelector } from 'react-redux'

    
const Profile = ({isLogged}) => {
    const uid = useSelector(state => state.isAuth.user?.userID)
    const usernm = useSelector(state => state?.isAuth?.user?.username)
    const [myprofile, setMyProfile] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [userBlocked, setUserBlocked] = useState(false)
    const history = useHistory()
    const {username} = useParams()

    
    const {loading, error, data, refetch, fetchMore} = useQuery(FETCH_INFO, {
        variables: {
            username: username===usernm ? usernm : username,
            limit:20,
            offset:0,
            userID: uid
        }
    })

    const isBlockedCB = useCallback(val => {
        setUserBlocked(val)
    }, [])

    
    useEffect(()=>{
        setIsLoading(true)
        if(username===usernm) {
            setMyProfile(true)
        } else {
            setMyProfile(false)
        }
        window.scrollTo(0,0)
        setIsLoading(false)
        return null
    }, [username, usernm, refetch, history, myprofile])


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
            show_status
        }
    }
`
