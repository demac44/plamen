import React from 'react'

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'

const DELETE_POST = gql`
    mutation delete_post($postID: Int!){
        delete_post(postID: $postID){
            postID
        }
    }
`


const PostOptionsMenu = ({postID}) => {
    const [delete_post, {}] = useMutation(DELETE_POST)


    const handlePostDelete = () => {
        try {delete_post({
            variables: {postID: postID}
        })
        window.location.reload()}
        catch(error){
            console.log(error);
        }
    }

    return (
        <div className='fp-options-menu'>
            <ul>
                <li>Update</li>
                <li>Hide</li>
                <li onClick={handlePostDelete}>Delete</li>
            </ul>
        </div>
    )
}

export default PostOptionsMenu
