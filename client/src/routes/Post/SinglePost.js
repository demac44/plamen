import React from 'react'
import { useParams, useHistory } from 'react-router'


import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/General components/Sidebar'

import Post from '../../components/Post/Post'
import PostLoader from '../../components/General components/Loaders/PostLoader'
import AlternativeNavbar from '../../components/General components/AlternativeNavbar'

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
            type
        }
    }
`

const SinglePost = ({isLogged}) => {
    const {postid} = useParams()
    const history = useHistory()
    const {data, loading} = useQuery(GET_POST, {
        variables:{postID: parseInt(postid)}
    })

    if(loading) return <div className='wh-100'><PostLoader/></div>

    return (
        <>
            <Navbar isLogged={isLogged}/>
            <AlternativeNavbar/>
            <div className='wrapper'> 
                <div className='container-main'>
                    <Sidebar/>
                    <div className='container-left'>
                        <h2 style={styles.title}>Post by @{data.get_post.username}</h2>
                        <Post post={data.get_post}/>
                    </div>
                </div>
            </div>
        </> 
    )
}

export default SinglePost


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