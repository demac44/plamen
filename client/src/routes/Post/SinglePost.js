import React, {memo} from 'react'
import { useParams } from 'react-router'
import { Redirect } from 'react-router-dom'


import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/General components/Sidebar'

import Post from '../../components/Post/Post'
import PostLoader from '../../components/General components/Loaders/PostLoader'
import AlternativeNavbar from '../../components/General components/AlternativeNavbar'

import MyGroupsList from '../../components/General components/MyGroupsList'
import UserSuggestionsBox from '../../components/General components/UserSuggestionsBox'
import { useSelector } from 'react-redux'


const GET_POST = gql`
    query ($postID: Int!, $uid: Int){
        get_post (postID: $postID, userID: $uid){
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

const SinglePost = ({isLogged}) => {
    const {postid} = useParams()
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const {data, loading} = useQuery(GET_POST, {
        variables:{postID: parseInt(postid), uid}
    })

    if(!loading){
        if(!data?.get_post?.postID) return <Redirect to='/404'/>
    }

    return (
        <>
            <Navbar isLogged={isLogged}/>
            <AlternativeNavbar/>
            <div className='wrapper'> 
                <div className='container-main'>
                    <Sidebar/>
                    <div className='container-left'>
                        {loading ? <PostLoader/> :
                        <>
                            <h3 style={styles.title}>Post by @{data.get_post.username}</h3>
                            <Post post={data.get_post}/>
                        </>}
                    </div>
                    {isLogged &&
                    <div className='container-right' style={{width:'35%'}}>
                        <MyGroupsList/>
                        <UserSuggestionsBox/>
                    </div>}
                </div>
            </div>
        </> 
    )
}

export default memo(SinglePost)


const styles = {
    title:{
        width:'100%',
        padding:'20px',
        color:'white',
        textAlign:'center',
        borderRadius:'10px',
        boxShadow:'5px 5px 10px black'     
    }
}