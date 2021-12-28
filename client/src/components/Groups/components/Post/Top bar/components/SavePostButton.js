import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'

import {gql} from 'graphql-tag'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'


const SavePostButton = ({postID, groupID}) => {
    const [saved, setSaved] = useState(false)
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [save_post] = useMutation(SAVE_GP)
    const [remove_saved] = useMutation(REMOVE_SAVED_GP)

    const ifSaved = useQuery(IF_GP_SAVED, {
        variables:{
            userID: uid,
            postID: postID
        }
    })
    
    useEffect(()=>{
        if(ifSaved?.data?.if_saved) setSaved(true)
    }, [ifSaved?.data])
    
    const handleSave = () => {
        save_post({
            variables: {
                postID: postID,
                userID: uid,
                gid: groupID
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
        <FontAwesomeIcon
            icon='bookmark'
            onClick={()=> !ifSaved.loading && (saved ? handleRemove() : handleSave())} 
            style={{...styles.saveBtn, color: ifSaved.loading ? 'white' : (saved ? '#ffbb00' : 'white')}}
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

const REMOVE_SAVED_GP = gql`
mutation ($postID:Int!,$userID:Int!){
    remove_saved_group_post (userID: $userID,postID:$postID){
        postID
    }
}
`
const SAVE_GP = gql`
    mutation ($postID:Int!,$userID:Int!, $gid: Int!){
        save_group_post(userID: $userID,postID: $postID, groupID: $gid){
            postID
        }
    }
`

const IF_GP_SAVED = gql`
    query ($userID: Int!, $postID: Int!){
        if_group_post_saved (userID: $userID, postID: $postID)
    }
`