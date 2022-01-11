import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {gql} from 'graphql-tag'
import { useMutation, useQuery } from 'react-apollo'
import logo from '../../../../images/logo-min.png'
import logoBlank from '../../../../images/logoBlank-min.png'

const LikePost = ({postID, userID}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [liked, setLiked] = useState(false)
    const [like_post] = useMutation(LIKE_POST)
    const [remove_like] = useMutation(REMOVE_LIKE)

    const ifLiked = useQuery(IF_LIKED, {
        variables:{
            postID: postID,
            userID: uid
        }
    })

    useEffect(()=>{
        !ifLiked.loading && (ifLiked?.data?.if_liked && setLiked(true))
    }, [ifLiked])

    const handleLike = () => {
        like_post({
            variables: {
                postID: postID,
                userID: uid,
                rid: userID
            }
        }).then(() => {
            setLiked(true)
        })
    }

    const handleRemove = () => {
        remove_like({
            variables: {
                postID: postID,
                userID: uid
            }
        }).then(()=>{
            setLiked(false)
        })   
    }

    return (
        <>
            <img 
                src={liked ? logo : logoBlank} 
                onClick={() => liked ? handleRemove() : handleLike()}
                className='like-post-btn'
                alt=''
            />
        </>
    )
}

export default LikePost

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
const IF_LIKED = gql`
query ($postID: Int!, $userID: Int!){
    if_liked(postID: $postID, userID: $userID)
}
`