import gql from 'graphql-tag'
import React, { useEffect } from 'react'
import { useQuery } from 'react-apollo'
import Post from '../../components/Feed/Posts/Post'
import Navbar from '../../components/Navbar/Navbar'
import LeftNavbar from '../../components/UI/LeftNavbar'


const GET_SAVED = gql`
    query ($userID: Int!){
        get_saves(userID:$userID){
            postID
            post_text
            date_posted
            url
            userID
            first_name
            last_name
            username
            profile_picture
        }
    }
`


const Saved = () => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const {loading, data,error, refetch} = useQuery(GET_SAVED, {
        variables: {userID: ls.userID},
    })

    useEffect(()=>{
        refetch()
    }, [data, refetch])

    if(loading) return <p>Loading</p>
    if(error) console.log(error);

    const posts = data.get_saves

    return (
        <>
            <Navbar/>
            <div className='main'>
                <LeftNavbar/>
                <div className='posts-container-feed'>
                    <h2>Saved posts</h2>
                    {posts.map(post => <Post post={{
                        postID: post.postID,
                        post_text: post.post_text,
                        date_posted: post.date_posted,
                        url: post.url
                    }} user={{
                        userID: post.userID,
                        first_name:post.first_name,
                        last_name: post.last_name,
                        username: post.username,
                        profile_picture: post.profile_picture
                    }}
                    key={post.postID}/>)}
                </div>
            </div>
        </>
    )
}

export default Saved
