import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'

import {gql} from 'graphql-tag'
import LoginPopUp from '../../../Entry/Login/LoginPopUp'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const SavePostButton = ({postID, isLogged}) => {
    const [saved, setSaved] = useState(false)
    const ls= JSON.parse(localStorage.getItem('user'))
    const [save_post] = useMutation(SAVE_POST)
    const [remove_saved] = useMutation(REMOVE_SAVED)
    const [loginPopUp, setLoginPopUp] = useState(false)


    const ifSaved = useQuery(IF_SAVED, {
        variables:{
            userID: ls?.userID,
            postID: postID
        }
    })

    useEffect(()=>{
        ifSaved?.data?.if_saved && setSaved(true)
    }, [postID, ifSaved])
    
    if(ifSaved.loading) return <i style={{...styles.saveBtn, color:'white'}} className="fas fa-bookmark"></i>
    
    const handleSave = () => {
        isLogged ?
        save_post({
            variables: {
                postID: postID,
                userID: isLogged && ls?.userID,
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
            <FontAwesomeIcon 
                icon='bookmark'
                onClick={()=> saved ? handleRemove() : handleSave()} 
                style={{...styles.saveBtn, color: saved ? '#ffbb00' : 'white'}}
            />
            {loginPopUp && <LoginPopUp/>}
        </>
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
