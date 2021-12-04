import React, { useEffect, useState, useCallback} from 'react'
import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'
import ShowUsersList from '../../../../UI/Users list/ShowUsersList.js'
import LoginPopUp from '../../../../Entry/Login/LoginPopUp.js'

const LIKE_POST = gql`
    mutation ($postID: Int!, $userID: Int!, $rid: Int!){
        like_post(postID: $postID, userID: $userID){
            postID
        }
        like_notification (postID: $postID, sender_id: $userID, receiver_id: $rid){
            postID
        }
    }
`
const LIKE_GP = gql`
    mutation ($postID: Int!, $userID: Int!){
        like_gp (postID: $postID, userID: $userID){
            postID
        }
    }
`
const REMOVE_LIKE = gql`
    mutation remove_like($postID: Int!, $userID: Int!){
        remove_like(postID: $postID, userID: $userID){
            postID
        }
        remove_like_notif(postID: $postID, sender_id: $userID){
            postID
        }
    }
`
const REMOVE_GP_LIKE = gql`
    mutation ($postID: Int!, $userID: Int!){
        remove_gp_like (postID: $postID, userID: $userID){
            postID
        }
    }
`

const LikePost = ({postID, likes, isLogged, uid, groupPost}) => {
    const [liked, setLiked] = useState(false)
    const [count, setCount] = useState(likes.length)
    const [showLikes, setShowLikes] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))
    const [like_post] = useMutation(groupPost ? LIKE_GP : LIKE_POST)
    const [remove_like] = useMutation(groupPost ? REMOVE_GP_LIKE : REMOVE_LIKE)
    const [loginPopUp, setLoginPopUp] = useState(false)

    useEffect(()=>{
        for (let el of likes){
            if (el.userID === user?.userID){
                setLiked(true)
                break
            }
        }
    },[likes, user?.userID])

    const callbackShowLikes = useCallback(val => {
        setShowLikes(val)
      }, [setShowLikes]);

    
    const handleLike = () => {
        isLogged ?
        like_post({
            variables: {
                postID: postID,
                userID: user?.userID,
                rid: uid
            }
        }).then(() => {
            setLiked(true)
            setCount(count+1)
        })
        : setLoginPopUp(true)
    }

    const handleRemove = () => {
        isLogged ?
        remove_like({
            variables: {
                postID: postID,
                userID: user?.userID
            }
        }).then(()=>{
            setLiked(false)
            setCount(count-1)
        })   
        : setLoginPopUp(true)
    }
    return (
        <>
            {showLikes && <ShowUsersList likes={likes} callback={callbackShowLikes}/>}
            <i className={'fas fa-heart fp-like-btn'} 
            style={{color: liked ? '#a50202' : 'white'}}
            onClick={() => liked ? handleRemove() : handleLike()}></i> 
            <p className='like-count' style={{cursor:'pointer'}} onClick={()=>setShowLikes(true)}>{count}</p> 
            {loginPopUp && <LoginPopUp/>}
        </>
    )
}

export default LikePost
