import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'

import {gql} from 'graphql-tag'

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


const SavePost = ({postID}) => {
    const [saved, setSaved] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))
    const [save_post] = useMutation(SAVE_POST)
    const [remove_saved] = useMutation(REMOVE_SAVED)


    const {loading, data} = useQuery(IF_SAVED, {
        variables:{userID: user.userID}
    })


    useEffect(()=>{
        data?.if_saved.map(save => save.postID === postID && setSaved(true))
    }, [data, postID])

    if(loading) return <i className="fas fa-bookmark fp-save-btn"></i>

    const handleSave = () => {
        save_post({
            variables: {
                postID: postID,
                userID: user.userID
            }
        }).then(() => setSaved(true))
    }

    const handleRemove = () =>{
        remove_saved({
            variables: {
                postID: postID,
                userID: user.userID
            }
        }).then(()=>setSaved(false))
    }

    return (
        <i className="fas fa-bookmark fp-save-btn" onClick={()=> saved ? handleRemove() : handleSave()} style={{
            color: saved ? '#ffbb00' : 'rgb(27, 27, 27)'
        }}></i>
    )
}

export default SavePost
