import React, { useEffect, useState, useCallback} from 'react'
import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'
import ShowUsersList from '../../../../UI/Users list/ShowUsersList.js'

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

const LikePost = ({postID, likes}) => {
    const [liked, setLiked] = useState(false)
    const [count, setCount] = useState(likes.length)
    const [showLikes, setShowLikes] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))
    const [like_post] = useMutation(LIKE_POST)
    const [remove_like] = useMutation(REMOVE_LIKE)

    useEffect(()=>{
        for (let el of likes){
            if (el.userID === user.userID){
                setLiked(true)
                break
            }
        }
    },[likes, user.userID])


    const callbackShowLikes = useCallback(val => {
        setShowLikes(val)
      }, [setShowLikes]);

    
    const handleLike = () => {
        like_post({
            variables: {
                postID: postID,
                userID: user.userID
            }
        }).then(() => {
            setLiked(true)
            setCount(count+1)
        })
    }

    const handleRemove = () => {
        remove_like({
            variables: {
                postID: postID,
                userID: user.userID
            }
        }).then(()=>{
            setLiked(false)
            setCount(count-1)
        })
    }
    return (
        <>
            {showLikes && <ShowUsersList likes={likes} callback={callbackShowLikes}/>}
            <i className="fas fa-check-circle fp-like-btn" style={{
             color: liked ? 'green' : 'white'
            }} onClick={() => liked ? handleRemove() : handleLike()}></i> 
            <p className='like-count' style={{cursor:'pointer'}} onClick={()=>setShowLikes(true)}>{count}</p> 
        </>
    )
}

export default LikePost
