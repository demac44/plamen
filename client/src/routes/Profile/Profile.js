import React, { useEffect } from 'react'
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
import MyGroupsList from '../../components/General components/MyGroupsList'

import '../../components/Groups/groups.css'
import '../../components/Profile/profile.css'
import CreatePost from '../../components/Post/Create post/CreatePost'
import Sidebar from '../../components/General components/Sidebar'
import AlternativeNavbar from '../../components/General components/AlternativeNavbar'
import SideInfoBox from '../../components/Profile/components/SideInfoBox'
import InterestsBox from '../../components/Profile/components/InterestsBox'

    
const Profile = ({myprofile, isLogged}) => {
    const ls = JSON.parse(localStorage.getItem('user')) 
    const history = useHistory()
    const {id} = useParams()
    
    const userID = parseInt(id)

    const {loading, error, data, refetch, fetchMore} = useQuery(FETCH_INFO, {
        variables: {
            userID: myprofile ? ls.userID : userID,
            limit:20,
            offset:0
        }
    })


    useEffect(()=>{
        if(userID === ls.userID) history.push('/myprofile')
        window.scrollTo(0,0)
    }, [userID, ls.userID, refetch])
    
    if (loading) return <ProfileLoader/>
    if(error) throw error 
    
    if(!data?.get_user?.userID) return <Redirect to='/404'/>

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
            <div className='wrapper' onLoad={scrollPagination}> 
                <div className='container-profile'>
                    <ProfileTopBox userID={userID} myprofile={myprofile} postsLength={data.get_profile_posts.length}/>
                </div>
                <div className='container-main'  style={{paddingTop:'10px'}}>
                    <Sidebar/>
                    <div className='container-left'>
                        {myprofile && <CreatePost refetch={refetch}/>}    
                        <Posts posts={data?.get_profile_posts} refetchPosts={refetch}/>  
                    </div>
                    <div className='container-right' style={{width:'35%', paddingTop:'10px'}}>
                        <SideInfoBox myprofile={myprofile}/>
                        <InterestsBox myprofile={myprofile}/>
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
        get_user(userID: $userID){
            first_name
            last_name
            profile_picture
            username
            userID
        }
    }
`
