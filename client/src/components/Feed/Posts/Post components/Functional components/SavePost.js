import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'

import {gql} from 'graphql-tag'
import LoginPopUp from '../../../../Entry/Login/LoginPopUp'


const SavePost = ({postID, isLogged, groupPost, gid}) => {
    const [saved, setSaved] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))
    const [save_post] = useMutation(groupPost ? SAVE_GP : SAVE_POST)
    const [remove_saved] = useMutation(groupPost ? REMOVE_SAVED_GP : REMOVE_SAVED)
    const [loginPopUp, setLoginPopUp] = useState(false)


    const {loading, data} = useQuery(groupPost ? IF_SAVED_GP : IF_SAVED, {
        variables:{
            userID: isLogged ? user?.userID : 0,
            postID: postID
        }
    })

    useEffect(()=>{
        if(groupPost) data?.if_saved_gp?.postID===postID && setSaved(true)
        else data?.if_saved?.postID===postID && setSaved(true)
    }, [data, postID, groupPost])
    
    if(loading) return <i className="fas fa-bookmark fp-save-btn"></i>
    
    const handleSave = () => {
        isLogged ?
        save_post({
            variables: {
                postID: postID,
                userID: isLogged && user?.userID,
                gid: parseInt(gid)
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
                userID: isLogged && user?.userID
            }
        }).then(()=>setSaved(false))
        : setLoginPopUp(true)
    }

    return (
        <>
        <i className="fas fa-bookmark fp-save-btn" onClick={()=> saved ? handleRemove() : handleSave()} style={{
            color: saved ? '#ffbb00' : 'white'
        }}></i>
        {loginPopUp && <LoginPopUp/>}
        </>
    )
}

export default SavePost


const SAVE_POST = gql`
    mutation ($postID:Int!,$userID:Int!){
        save_post(userID: $userID,postID:$postID){
            postID
        }
    }
`
const SAVE_GP = gql`
    mutation ($postID:Int!,$userID:Int!, $gid: Int!){
        save_gp(userID: $userID,postID: $postID, groupID: $gid){
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
const REMOVE_SAVED_GP = gql`
    mutation ($postID:Int!,$userID:Int!){
        remove_saved_gp (userID: $userID,postID:$postID){
            postID
        }
    }
`

const IF_SAVED = gql`
    query ($userID: Int!, $postID: Int!){
        if_saved(userID: $userID, postID: $postID){
            postID
        }
    }
`
const IF_SAVED_GP = gql`
    query ($userID: Int!, $postID: Int!){
        if_saved_gp (userID: $userID, postID: $postID){
            postID
        }
    }
`