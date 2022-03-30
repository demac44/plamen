import React, { useEffect, useState, memo, useCallback } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Redirect } from 'react-router-dom'
import '../../components/Profile/profile.css'
import ProfileTopBox from '../../components/Profile/Profile top box/ProfileTopBox'
import gql from 'graphql-tag'
import { useMutation, useQuery } from 'react-apollo'
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
import EmailConfirmWarning from '../../components/General components/Confirm email/EmailConfirmWarning'

    
const Profile = () => {
    const uid = useSelector(state => state.isAuth.user?.userID)
    const usernm = useSelector(state => state?.isAuth?.user?.username)
    const [myprofile, setMyProfile] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [userBlocked, setUserBlocked] = useState(false)
    const [profile_visit] = useMutation(PROFILE_VISIT)
    const history = useHistory()
    const {username} = useParams()

    
    const {loading, error, data, refetch, fetchMore} = useQuery(FETCH_INFO, {
        variables: {
            username: username,
            limit:10,
            offset:0,
            userID: uid
        }
    })

    const isBlockedCB = useCallback(val => {
        setUserBlocked(val)
    }, [setUserBlocked])

    const profileVisit = () => {
        if(!loading && !isLoading && !myprofile && data?.get_user?.userID){
            profile_visit({
                variables:{
                    visitorId: uid, 
                    visitedId: data?.get_user?.userID}
                })
                return
        }
        return
    }
    
    useEffect(()=>{
        setIsLoading(true)
        if(!loading && (username===usernm)) {
            setMyProfile(true)
        } else {
            setMyProfile(false)
        }
        window.scrollTo(0,0)
        setIsLoading(false)
        profileVisit()
    }, [username, usernm, refetch, history, myprofile, data, loading])


    if(!loading){
        if(!data?.get_user?.userID) return <Redirect to='/404'/>
    }
    if(error) throw error 


    const scrollPagination = () => {
        window.onscroll = async ()=>{
            if(Math.round(window.scrollY+window.innerHeight) >= document.body.scrollHeight-window.innerHeight){
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
            <Navbar/>
            <AlternativeNavbar/>
            <div className='wrapper wrapper-profile' onLoad={scrollPagination}> 
                <div className='container-main' style={{paddingTop:'10px'}}>
                    <Sidebar/>
                    <div className='container-left'>
                        {!loading && (!data?.confirmed_email_check && <EmailConfirmWarning/>)}

                        {(loading || isLoading) ? <ProfileBoxLoader/> 
                            : <ProfileTopBox 
                                user={data.get_user}
                                myprofile={myprofile} 
                                isBlockedCB={isBlockedCB}
                                />
                        }

                        {(loading || isLoading || userBlocked) ? <PostLoader/> :
                        <>
                            {myprofile && <CreatePost refetch={refetch}/>}    
                            <Posts posts={data?.get_profile_posts} refetchPosts={refetch}/>  
                        </>}
                    </div>
                    <div className='container-right'>
                        {(loading || isLoading || userBlocked) ? '' :
                        <>
                            <SideInfoBox myprofile={myprofile} userID={data?.get_user?.userID}/>
                            <InterestsBox myprofile={myprofile} userID={data?.get_user?.userID}/>
                        </>
                        }
                    </div>
                </div>
            </div>
        </> 
    )
}

export default memo(Profile)  



const FETCH_INFO= gql`
    query ($limit: Int, $offset: Int, $username: String!, $userID: Int!){
        confirmed_email_check(userID: $userID)
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
const PROFILE_VISIT = gql`
    mutation($visitorId: Int, $visitedId: Int){
        profile_visit(visitorId: $visitorId, visitedId: $visitedId){
            visitedId
        }
        set_last_seen (userID: $visitorId){
          userID
        }
    }
`
