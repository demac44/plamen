import React, { useEffect, useState } from 'react'
import {gql} from 'graphql-tag'
import { useMutation, useQuery } from 'react-apollo'
import { useSelector } from 'react-redux';
import logo from '../../../../../images/logo-min.jpg'
import logoBlank from '../../../../../images/logoBlank-min.jpg'

const LikePost = ({postID, userID}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [liked, setLiked] = useState(false)
    const [like_post, {error}] = useMutation(LIKE_GP)
    const [remove_like] = useMutation(REMOVE_GP_LIKE)

    const ifLiked = useQuery(IF_LIKED_GP, {
        variables:{
            postID: postID,
            userID: uid
        }
    })

    useEffect(()=>{
        !ifLiked.loading && (ifLiked?.data?.if_group_post_liked && setLiked(true))
    }, [ifLiked])

    if(error) throw error
    
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
    
const LIKE_GP = gql`
mutation ($postID: Int!, $userID: Int!){
    like_group_post (postID: $postID, userID: $userID){
            postID
        }
    }
    `
    const REMOVE_GP_LIKE = gql`
    mutation ($postID: Int!, $userID: Int!){
        remove_group_post_like (postID: $postID, userID: $userID){
            postID
        }
    }
`
const IF_LIKED_GP = gql`
query ($postID: Int, $userID: Int){
    if_group_post_liked (postID: $postID, userID: $userID)
}
`