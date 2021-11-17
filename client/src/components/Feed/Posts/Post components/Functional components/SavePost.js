import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'

import {gql} from 'graphql-tag'
import LoginPopUp from '../../../../Entry/Login/LoginPopUp'

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
    query ($userID: Int!){
        if_saved(userID: $userID){
            postID
        }
    }
`


const SavePost = ({postID, isLogged}) => {
    const [saved, setSaved] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))
    const [save_post] = useMutation(SAVE_POST)
    const [remove_saved] = useMutation(REMOVE_SAVED)
    const [loginPopUp, setLoginPopUp] = useState(false)


    const {loading, data} = useQuery(IF_SAVED, {
        variables:{userID: isLogged ? user?.userID : 0}
    })

    useEffect(()=>{
        data?.if_saved?.map(save => save.postID === postID && setSaved(true))
    }, [data, postID])

    if(loading) return <i className="fas fa-bookmark fp-save-btn"></i>

    const handleSave = () => {
        isLogged ?
        save_post({
            variables: {
                postID: postID,
                userID: isLogged && user?.userID
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
