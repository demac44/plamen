import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'

import {gql} from 'graphql-tag'
import LoginPopUp from '../../../Entry/Login/LoginPopUp'

const SavePostButton = ({postID, groupID}) => {
    const isLogged = true
    const [saved, setSaved] = useState(false)
    const ls= JSON.parse(localStorage.getItem('user'))
    const [save_post] = useMutation(groupID ? SAVE_GP : SAVE_POST)
    const [remove_saved] = useMutation(groupID ? REMOVE_SAVED_GP : REMOVE_SAVED)
    const [loginPopUp, setLoginPopUp] = useState(false)


    const ifSaved = useQuery(groupID ? IF_GP_SAVED : IF_SAVED, {
        variables:{
            userID: ls?.userID,
            postID: postID
        }
    })

    useEffect(()=>{
        if(groupID) ifSaved?.data?.if_group_post_saved && setSaved(true)
        else ifSaved?.data?.if_saved && setSaved(true)
    }, [postID, ifSaved])
    
    if(ifSaved.loading) return <i style={{...styles.saveBtn, color:'white'}} className="fas fa-bookmark"></i>
    
    const handleSave = () => {
        isLogged ?
        save_post({
            variables: {
                postID: postID,
                userID: isLogged && ls?.userID,
                gid: groupID
            }
        }).then(() => setSaved(true))
        :
        setLoginPopUp(true)
    }

    const handleRemove = () =>{
        isLogged ?
        remove_saved({
            variables: {
                postID: postID,
                userID: isLogged && ls?.userID
            }
        }).then(()=>setSaved(false))
        : setLoginPopUp(true)
    }

    return (
        <>
            <i 
                className="fas fa-bookmark" 
                onClick={()=> saved ? handleRemove() : handleSave()} 
                style={{...styles.saveBtn, color: saved ? '#ffbb00' : 'white'}}
            ></i>
            {loginPopUp && <LoginPopUp/>}
        </>
    )
}

export default SavePostButton

const styles = {
    saveBtn:{
        fontSize:'30px',
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