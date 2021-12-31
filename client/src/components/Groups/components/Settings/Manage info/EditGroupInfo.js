import React, {useState} from 'react'

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'
import './style.css'

const EditGroupInfo = ({group_description, group_rules, groupid, refetch}) => {
    const [change_info] = useMutation(CHANGE_INFO)
    const [updated, setUpdated] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        const desc = e.target.desc.value
        const rules = e.target.rules.value

        change_info({
            variables:{
                gid: parseInt(groupid),
                desc,
                rules
            }
        }).then(()=>{refetch();setUpdated(true)})
    }

    return (
        <form className='box flex-col-ctr' onSubmit={handleSubmit}>
            <p>Description and rules</p>

            {updated && <p className='updated-msg'>Updated!</p>}

            <div className='wh-100'>
                <span>
                    <p className='edit-gp-info-stitle'>Description: </p>
                    <textarea
                        type='text' 
                        id='desc'
                        className='edit-gp-info-textarea' 
                        placeholder='Community description'
                        defaultValue={group_description}
                    />
                </span>

                <span>
                    <p className='edit-gp-info-stitle'>Rules: </p>
                    <textarea 
                        type='text' 
                        id='rules'
                        className='edit-gp-info-textarea' 
                        placeholder='Community rules'
                        defaultValue={group_rules}
                    />
                </span>
            </div>

            <button type='submit' className='btn edit-form-btn'>SAVE</button>
        </form>
    )
}

export default EditGroupInfo

const CHANGE_INFO = gql`
    mutation ($gid: Int!, $desc: String!, $rules: String!){
        change_group_info(groupID: $gid, group_description: $desc, group_rules: $rules){
            groupID
        }
    }
`