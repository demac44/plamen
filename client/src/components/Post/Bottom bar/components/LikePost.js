import React, { useEffect, useState, useCallback} from 'react'
import {gql} from 'graphql-tag'
import { useMutation, useQuery } from 'react-apollo'
// import ShowUsersList from '../../../../UI/Users list/ShowUsersList.js'
import LoginPopUp from '../../../Entry/Login/LoginPopUp.js'

const LikePost = ({data}) => {
    const isLogged = true
    const ls = JSON.parse(localStorage.getItem('user'))
    const [liked, setLiked] = useState(false)
    const [like_post, {error}] = useMutation(LIKE_POST)
    const [remove_like] = useMutation(REMOVE_LIKE)
    const [loginPopUp, setLoginPopUp] = useState(false)

    const ifLiked = useQuery(IF_LIKED, {
        variables:{
            postID: data.postID,
            userID: data.userID
        }
    })

    useEffect(()=>{
        ifLiked?.data?.if_liked===true && setLiked(true)
    }, [data, ifLiked?.data])

    if(ifLiked.loading) return <p>O</p>
    if(error) throw error

    
    const handleLike = () => {
        isLogged ?
        like_post({
            variables: {
                postID: data?.postID,
                userID: ls.userID,
                rid: data?.userID
            }
        }).then(() => {
            setLiked(true)
        })
        : setLoginPopUp(true)
    }

    const handleRemove = () => {
        isLogged ?
        remove_like({
            variables: {
                postID: data?.postID,
                userID: ls.userID
            }
        }).then(()=>{
            setLiked(false)
        })   
        : setLoginPopUp(true)
    }
    return (
        <>
            <i  className='fas fa-heart'
                style={{...styles.likeBtn, color: liked ? '#a50202' : 'white'}}
                onClick={() => liked ? handleRemove() : handleLike()}></i> 
            {loginPopUp && <LoginPopUp/>}
        </>
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



    // const LIKE_GP = gql`
    //     mutation ($postID: Int!, $userID: Int!){
    //         like_gp (postID: $postID, userID: $userID){
    //             postID
    //         }
    //     }
    // `
    // const REMOVE_GP_LIKE = gql`
    // mutation ($postID: Int!, $userID: Int!){
    //     remove_gp_like (postID: $postID, userID: $userID){
    //         postID
    //     }
    // }
    // `