import React, { useState } from 'react'
import './style.css'
import {gql} from 'graphql-tag'
import { useMutation} from 'react-apollo'

const EditGender = ({data, uid}) => {
    const [edit_gender] = useMutation(EDIT_GENDER)
    const [updated, setUpdated] = useState(false)

    const [errorMsg, setErrorMsg] = useState(null)


    const handleGenderEdit = (e) => {
        e.preventDefault()

        const gender = e.target.gender.value

        edit_gender({
            variables:{
                userID: uid,
                gender
            }
        }).then(res=>{
            if(res?.data?.edit_gender?.error){
                setUpdated(false)
                setErrorMsg(res?.data?.edit_gender?.error)
            } else {
                setErrorMsg(false)
                setUpdated(true)
            }
        })
    }

    return (
        <form className='edit-user-info-box flex-col-ctr' onSubmit={handleGenderEdit}>
            <p style={{padding:'10px', textAlign:'center'}}>Edit gender</p>

            {updated && <p className='updated-msg'>Your gender is updated!</p>}

            {errorMsg && <p className='err-msg'>{errorMsg}</p>}

            <div className='flex-ctr'>
                <h5>Gender</h5>
                <select id='gender' name='gender' className='input'>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </select>
            </div>
            <span className='flex-sb current-data-box'>
                    <p style={{fontSize:'14px'}}>Current: {data}</p>
                    <button type='submit' className='btn'>SAVE</button>
            </span>
            <p className='edit-warning'>
                <strong>Warning: </strong>
                You can change your gender only once!
            </p>
        </form>
    )
}

export default EditGender

const EDIT_GENDER = gql`
    mutation ($userID: Int!, $gender: String!){
        edit_gender(userID: $userID, gender: $gender){
            error
        }
    }
`
