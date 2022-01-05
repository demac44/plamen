import React, { useState } from 'react'

import {gql} from 'graphql-tag'
import { useMutation} from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EditGroupVisibility = ({visibility, groupid, refetch}) => {
    const [change_visibility] = useMutation(CHANGE_VISIBILITY)
    const [visib, setVisib] = useState(visibility)

    const handleChange = () => {
        change_visibility({
            variables:{
                gid: parseInt(groupid),
                closed: visib
            }
        }).then(()=>{setVisib(!visib);refetch()})
    }

    return (
        <div className='box flex-ac'>
            <p>Community visibility: </p>

            <div className='switch-box' onClick={handleChange}>
                <FontAwesomeIcon icon='lock' className='lock-icon'/>
                <FontAwesomeIcon icon='lock-open' className='lock-icon'/>
                <div className='switch' style={{ 
                            left: visib ? '0' : '32px',
                            backgroundColor: visib ? '#861b1b' : '#00752d'}}></div>
            </div>

        </div>
    )
}

export default EditGroupVisibility

const CHANGE_VISIBILITY = gql`
    mutation ($gid: Int!, $closed: Boolean!){
        change_group_visibility (groupID: $gid, closed: $closed){
            closed
        }
    }
`
