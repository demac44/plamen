import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'

import {gql} from 'graphql-tag'
import LoginPopUp from '../../../../../Entry/Login/LoginPopUp'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


const SavePostButton = ({postID, groupID, isLogged}) => {
    const [saved, setSaved] = useState(false)
    const ls= JSON.parse(localStorage.getItem('user'))
    const [save_post] = useMutation(SAVE_GP)
    const [remove_saved] = useMutation(REMOVE_SAVED_GP)
    const [loginPopUp, setLoginPopUp] = useState(false)


    const ifSaved = useQuery(IF_GP_SAVED, {
        variables:{
            userID: ls?.userID,
            postID: postID
        }
    })

    useEffect(()=>{
        ifSaved?.data?.if_group_post_saved && setSaved(true)
    }, [postID, ifSaved, groupID])
    
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