import React from 'react'

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'

const RolesMenu = ({setRoleCb, userID, groupID}) => {
    const [change_role] = useMutation(CHANGE_ROLE)

    const handleChangeRole = (role, id) => {
        change_role({
            variables:{
                uid: userID,
                gid: groupID,
                roleID: id,
            }
        }).then(()=>setRoleCb(role))
    }


    return (
        <div className='roles-menu'>
            <ul>
                <li onClick={()=>handleChangeRole('ADMIN', 2)}>ADMIN</li>
                <li onClick={()=>handleChangeRole('MODERATOR', 3)}>MODERATOR</li>
                <li onClick={()=>handleChangeRole('MEMBER', 4)}>MEMBER</li>
            </ul>
        </div>
    )
}

export default RolesMenu


const CHANGE_ROLE = gql`
    mutation ($uid: Int!, $gid: Int!, $roleID: Int!){
        change_member_role(userID: $uid, groupID: $gid, roleID: $roleID){
            roleID
        }
    }
`