import React, { useEffect, useState } from 'react'
import {gql} from 'graphql-tag'
import { useMutation, useQuery} from 'react-apollo'

const LIKE_POST = gql`
    mutation like_post($postID: Int!, $userID: Int!){
        like_post(postID: $postID, userID: $userID){
            postID
        }
    }
`
const REMOVE_LIKE = gql`
    mutation remove_like($postID: Int!, $userID: Int!){
        remove_like(postID: $postID, userID: $userID){
            postID
        }
    }
`

const IF_LIKED = gql`
    query get_likes($userID: Int!){
        if_liked(userID: $userID){
            postID
            likeID
        }
    }
`


const LikePost = ({postID}) => {
    const [liked, setLiked] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))
    const [like_post] = useMutation(LIKE_POST)
    const [remove_like] = useMutation(REMOVE_LIKE)

    const {loading, error, data, refetch} = useQuery(IF_LIKED, {
        variables:{
            userID: user.userID,
        }
    })

    useEffect(()=>{
        data?.if_liked.map(like => {
            if(like.postID === postID) setLiked(true) 
        })  
        refetch()
    }, [data])
    
    if(loading) return <p>Loading...</p>
    if(error) throw error
    

    const handleLike = () => {
        like_post({
            variables: {
                postID: postID,
                userID: user.userID
            }
        }).then(() => {
            setLiked(true)})
    }

    const handleRemove = () => {
        remove_like({
            variables: {
                postID: postID,
                userID: user.userID
            }
        }).then(()=>setLiked(false))
    }
    return (
        <>
            <i className="fas fa-check-circle fp-like-btn" style={{
             color: liked ? 'green' : 'white'
            }} onClick={() => liked ? handleRemove() : handleLike()}></i> 
            <p className='like-count'></p> 
        </>
    )
}

export default LikePost
