import React, { useEffect, useState } from 'react'
import {gql} from 'graphql-tag'
import { useMutation, useQuery } from 'react-apollo'

import logo from '../../../../../../images/logo.png'
import logoBlank from '../../../../../../images/logoBlank.png'

const LikePost = ({postID, userID}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [liked, setLiked] = useState(false)
    const [like_post, {error}] = useMutation(LIKE_GP)
    const [remove_like] = useMutation(REMOVE_GP_LIKE)

    const ifLiked = useQuery(IF_LIKED_GP, {
        variables:{
            postID: postID,
            userID: ls.userID
        }
    })

    useEffect(()=>{
        return ifLiked?.data?.if_group_post_liked && setLiked(true)
    }, [ifLiked?.data])

    if(error) throw error
    
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
        <>
            <img 
                src={ifLiked?.loading ? logoBlank : (liked ? logo : logoBlank)} 
                onClick={() => liked ? handleRemove() : handleLike()}
                style={styles.logo}
            />
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
    },
    logo:{
        height:'100%',
        margin:'0 10px 0 5px',
        cursor:'pointer'
    }
}

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
// <FontAwesomeIcon  
//     icon='heart'
//     style={{...styles.likeBtn, color: ifLiked.loading ? 'white' 
//                 : liked ? '#a50202' : 'white'}}
//     onClick={() => liked ? handleRemove() : handleLike()}/>
