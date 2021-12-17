import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'

import {gql} from 'graphql-tag'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const SavePostButton = ({postID}) => {
    const [saved, setSaved] = useState(false)
    const ls= JSON.parse(localStorage.getItem('user'))
    const [save_post] = useMutation(SAVE_POST)
    const [remove_saved] = useMutation(REMOVE_SAVED)

    const ifSaved = useQuery(IF_SAVED, {
        variables:{
            userID: ls?.userID,
            postID: postID
        }
    })

    const handleSave = () => {
        save_post({
            variables: {
                postID: postID,
                userID: ls.userID,
            }
        }).then(() => setSaved(true))
    }

    const handleRemove = () =>{
        remove_saved({
            variables: {
                postID: postID,
                userID: ls.userID
            }
        }).then(()=>setSaved(false))
    }

    return (
        <FontAwesomeIcon 
            icon='bookmark'
            onClick={()=> !ifSaved.loading && (ifSaved?.data?.if_saved || saved) ? handleRemove() : handleSave()} 
            style={{...styles.saveBtn, color: ifSaved.loading ? 'white' : (ifSaved?.data?.if_saved || saved) ? '#ffbb00' : 'white'}}
        />
    )
}

export default SavePostButton

const styles = {
    saveBtn:{
        fontSize:'25px',
        marginRight:'20px',
        cursor:'pointer'
    }
}

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
