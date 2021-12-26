import React, { useState } from 'react'

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


const ReportedPostMenu = ({data, refetchPosts}) => {
    const [delete_post] = useMutation(DELETE_POST)

    const handleRemove = () => {
        try {delete_post({
            variables: {postID: data.postID}
        }).then(()=>refetchPosts())}
        catch{}
    }

    return (
        <>
            <div className='post-options-menu' style={{width:'fit-content'}}>
                <ul>
                    <li onClick={()=>handleRemove()}><FontAwesomeIcon icon='times' /> Remove user</li>
                </ul>
            </div>
        </>
    )
}

export default ReportedPostMenu


const DELETE_POST = gql`
    mutation delete_post($postID: Int!){
        delete_post(postID: $postID){
            postID
        }
    }
`