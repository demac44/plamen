import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import {gql} from 'graphql-tag'
import { useSelector } from 'react-redux'

const SavePostButton = ({postID}) => {
    const [saved, setSaved] = useState(false)
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [save_post] = useMutation(SAVE_POST)
    const [remove_saved] = useMutation(REMOVE_SAVED)

    const ifSaved = useQuery(IF_SAVED, {
        variables:{
            userID: uid,
            postID: postID
        }
    })

    useEffect(()=>{
        !ifSaved.loading && (ifSaved?.data?.if_saved && setSaved(true))
    }, [ifSaved])

    const handleSave = () => {
        save_post({
            variables: {
                postID: postID,
                userID: uid,
            }
        }).then(() => setSaved(true))
    }

    const handleRemove = () =>{
        remove_saved({
            variables: {
                postID: postID,
                userID: uid
            }
        }).then(()=>setSaved(false))
    }

    return (
        <i 
            className='fas fa-bookmark save-post-btn'
            onClick={()=> saved ? handleRemove() : handleSave()} 
            style={{color: saved ? '#ffbb00' : 'white'}}
        />
    )
}

export default SavePostButton

const SAVE_POST = gql`
    mutation ($postID:Int!,$userID:Int!){
        save_post(userID: $userID,postID:$postID){
            postID
        }
    }
`
const REMOVE_SAVED = gql`
mutation ($postID:Int!,$userID:Int!){
    remove_saved(userID: $userID,postID:$postID){
        postID
    }
}
`
const IF_SAVED = gql`
    query ($userID: Int!, $postID: Int!){
        if_saved(userID: $userID, postID: $postID)
    }
`
