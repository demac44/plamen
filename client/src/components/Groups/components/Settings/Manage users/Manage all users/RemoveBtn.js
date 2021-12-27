import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'

const RemoveBtn = ({userID, groupID, refetch}) => {
    const [remove_user] = useMutation(REMOVE_USER)

    const handleRemove = () => {
        remove_user({
            variables: {
                userID: userID,
                groupID:groupID
            }
        }).then(()=>refetch())
    }
    return (
        <p style={styles.removeBtn} onClick={handleRemove}><FontAwesomeIcon icon='times'/></p>
    )
}

export default RemoveBtn

const styles = {
    removeBtn:{
        fontSize:'12px',
        border:'1px solid #2f2f2f',
        padding:'2px 5px',
        borderRadius:'10px'
    }
}  

const REMOVE_USER = gql`
    mutation($userID: Int!, $groupID: Int!){
        remove_group_user(userID: $userID, groupID: $groupID){
            userID
        }
    }
`