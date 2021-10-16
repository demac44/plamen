import React from 'react'

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'

const DELETE_POST = gql`
    mutation delete_post($tpostID: Int!){
        delete_post(tpostID: $tpostID){
            tpostID
        }
    }
`


const PostOptionsMenu = ({id}) => {
    const [delete_post, {}] = useMutation(DELETE_POST)


    const handlePostDelete = () => {
        delete_post({
            variables: {tpostID: id}
        })
        window.location.reload()
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
