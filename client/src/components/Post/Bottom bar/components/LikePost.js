import React, { useEffect, useState } from 'react'
import {gql} from 'graphql-tag'
import { useMutation, useQuery } from 'react-apollo'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const LikePost = ({postID, userID}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [liked, setLiked] = useState(false)
    const [like_post] = useMutation(LIKE_POST)
    const [remove_like] = useMutation(REMOVE_LIKE)

    const ifLiked = useQuery(IF_LIKED, {
        variables:{
            postID: postID,
            userID: ls.userID
        }
    })

    const handleLike = () => {
        like_post({
            variables: {
                postID: postID,
                userID: ls.userID,
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
                userID: ls.userID
            }
        }).then(()=>{
            setLiked(false)
        })   
    }
    return (
        <FontAwesomeIcon icon='heart'
            style={{...styles.likeBtn}}
            style={{...styles.likeBtn, color: ifLiked.loading ? 'white' : (ifLiked?.data?.if_liked || liked) ? '#a50202' : 'white'}}
            onClick={() => !ifLiked.loading && ((ifLiked?.data?.if_liked || liked) ? handleRemove() : handleLike())}
        />
    )
}

export default LikePost

const styles = {
    likeBtn:{
        fontSize:'30px',
        minWidth:'40px',
        textAlign:'center',
        cursor:'pointer'
    }
}

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