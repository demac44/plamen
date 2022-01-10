import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './style.css'
import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import MyGroupsList from '../../components/General components/MyGroupsList'
import Posts from '../../components/Post/Posts'
import Sidebar from '../../components/General components/Sidebar'
import AlternativeNavbar from '../../components/General components/AlternativeNavbar'
import UserSuggestionsBox from '../../components/General components/UserSuggestionsBox'
import PostLoader from '../../components/General components/Loaders/PostLoader'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Explore = ({isLogged}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const {loading, data, refetch} = useQuery(RANDOM_POSTS, {pollInterval:9000000, variables:{uid}})

    useEffect(()=>{
        window.scrollTo(0,0)
    }, [])

    return (
        <div className='section-main'>
            <Navbar isLogged={isLogged}/>
            <AlternativeNavbar/>
            <div className='wrapper'>
                <div className='container-main'>
                    <Sidebar/>
                    <div className='container-left'>
                        <div className='section-title flex-ctr'><h2>Explore</h2></div>
                        {loading ? <PostLoader/> : <Posts posts={data.random_posts} refetchPosts={refetch}/>}
                        <div 
                            onClick={()=>{
                                window.scrollTo(0,0);
                                refetch()
                            }} 
                            className='flex-col-ctr explore-reload-box box'
                        >
                            <p>Refresh?</p>
                            <br/>
                            <FontAwesomeIcon icon='redo' size='lg' color='white'/>
                        </div>
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

export default Explore

const RANDOM_POSTS = gql`
    query($uid: Int!){
        random_posts(userID: $uid){
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