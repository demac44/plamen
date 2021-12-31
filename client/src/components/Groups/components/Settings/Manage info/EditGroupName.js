import React, { useState } from 'react'

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'

const EditGroupName = ({group_name, groupid, refetch}) => {
    const [updated, setUpdated] = useState(false)
    const [change_info] = useMutation(CHANGE_NAME)

    const handleSubmit = (e) => {
        e.preventDefault()

        const name = e.target.name.value

        change_info({
            variables:{
                gid: parseInt(groupid),
                name
            }
        }).then(()=>{refetch();setUpdated(true)})
    }

    return (
        <form className='box flex-col-ctr' onSubmit={handleSubmit}>
            <p>Change community name</p>
        
            {updated && <p className='updated-msg'>Updated!</p>}
        
            <div className='wh-100'>
                <span>
                    <p className='edit-gp-info-stitle'>Name: </p>
                    <input 
                        type='text' 
                        id='name'
                        className='input' 
                        placeholder='Community name'
                        defaultValue={group_name}
                        />
                </span>
        
            </div>
            <button type='submit' className='btn edit-form-btn'>SAVE</button>
        </form>
    )
}

export default EditGroupName

const CHANGE_NAME = gql`
    mutation ($gid: Int!, $name: String!){
        change_group_name(groupID: $gid, group_name: $name){
            groupID
        }
    }
`