import React, {useState, useEffect, useCallback} from 'react'
import { useParams } from 'react-router'

import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import Loader from '../../components/UI/Loader'
import LeftNavbar from '../../components/UI/LeftNavbar'
import Navbar from '../../components/Navbar/Navbar'
import PostComp from '../../components/Feed/Posts/Post'

const GET_POST = gql`
    query ($postID: Int!){
        get_post (postID: $postID){
            postID
            post_text
            date_posted
            url
            userID
            first_name
            last_name
            username
            profile_picture
            comments{
                commentID
                userID
                username
                comment_text
                date_commented
                profile_picture
            }
            likes{
                likeID
                postID
                userID
                username
                first_name
                last_name
                profile_picture
            }
        }
    }
`

const Post = ({isLogged}) => {
    const {postid} = useParams()
    const [leftnav, setLeftnav] = useState(false)
    const [updated, setUpdated] = useState(false)
    const {data, loading, refetch} = useQuery(GET_POST, {
        variables:{postID: parseInt(postid)}
    })
    
    const leftNavCallback = useCallback(val =>{
        setLeftnav(val)
    }, [setLeftnav])

    const updatedCallback = useCallback(val => {
        setUpdated(val)
    }, [setUpdated])

    useEffect(()=>{
        if(updated){
            refetch()
            setUpdated(false)
        }
    }, [updated, refetch])
    

    if(loading) return <div className='wh-100'><Loader/></div>

    const post = data.get_post

    return (
        <>
            <Navbar callback={leftNavCallback} isLogged={isLogged}/>
            <div className='wrapper'> 
                <div className='single-post-main flex-col-ctr' >
                    {isLogged && <LeftNavbar show={leftnav}/>}
                    <h2 style={styles.title}>Post by @{post.username}</h2>
                    <PostComp post={{
                            postID: post.postID,
                            post_text: post.post_text,
                            date_posted: post.date_posted,
                            url: post.url,
                        }} user={{ 
                            userID: post.userID,
                            first_name:post.first_name,
                            last_name: post.last_name,
                            username: post.username,
                            profile_picture: post.profile_picture
                        }} comments={post.comments}
                        updatedCallback={updatedCallback}
                        likes={post.likes}
                        key={post.postID}/>
                </div>
            </div>
        </> 
    )
}

export default Post


const styles = {
    title:{
        width:'60%',
        padding:'20px',
        backgroundColor:'#111827',
        color:'white',
        textAlign:'center',
        borderRadius:'10px'     
    }
}