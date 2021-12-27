import React from 'react'

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


const ReportedPostMenu = ({data, refetchPosts}) => {
    const [remove_user] = useMutation(REMOVE_USER)

    const handleRemove = () => {
        remove_user({
            variables: {
                userID: data.userID,
                groupID:data.groupID
            }
        }).then(()=>refetchPosts())
    }

    return (
        <>
            <div className='post-options-menu' style={{width:'fit-content'}}>
                <ul>
                    <li onClick={handleRemove}><FontAwesomeIcon icon='times' /> Remove user</li>
                </ul>
            </div>
        </>
    )
}

export default ReportedPostMenu


const REMOVE_USER = gql`
    mutation($userID: Int!, $groupID: Int!){
        remove_group_user(userID: $userID, groupID: $groupID){
            userID
        }
    }
`