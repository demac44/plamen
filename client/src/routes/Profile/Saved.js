import React, {useCallback, useState, useEffect} from 'react'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import Post from '../../components/Feed/Posts/Post'
import Navbar from '../../components/Navbar/Navbar'
import LeftNavbar from '../../components/UI/LeftNavbar'
import Loader from '../../components/UI/Loader'


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


const Saved = () => {
    const [updated, setUpdated] = useState(false)
    const ls = JSON.parse(localStorage.getItem('user'))

    const {loading, data, error, refetch} = useQuery(GET_SAVED, { 
        variables: {userID: ls.userID},
    })
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
    if(error) console.log(error);

    const posts = data.get_saves

    return (
        <>
            <Navbar/>
            <div className='main'>
                <LeftNavbar/>
                <div className='posts-container-feed'>
                    <h2>Saved posts</h2>
                    {posts.length > 0 ? posts.map(post => <Post post={{
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
                    }} comments={post.comments}
                    likes={post.likes}
                    callback={updatedCallback}
                    key={post.postID}/>) : <p style={{marginTop:'30px'}}>No saved posts</p>}
                </div>
            </div>
        </>
    )
}

export default Saved
