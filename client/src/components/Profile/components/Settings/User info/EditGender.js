import React, { useState } from 'react'

import {gql} from 'graphql-tag'
import { useMutation} from 'react-apollo'

const EditGender = ({data}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [edit_gender] = useMutation(EDIT_GENDER)
    const [updated, setUpdated] = useState(false)

    const [errorMsg, setErrorMsg] = useState(null)


    const handleGenderEdit = (e) => {
        e.preventDefault()

        const gender = e.target.gender.value

        edit_gender({
            variables:{
                userID: ls.userID,
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

            {updated && <p style={styles.updated}>Your gender is updated!</p>}

            {errorMsg && <p style={styles.error}>{errorMsg}</p>}

            <div className='flex-ctr' style={{width:'80%', marginTop:'15px'}}>
                <h5>Gender</h5>
                <select id='gender' name='gender'>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </select>
            </div>
            <span className='flex-sb' style={{width:'100%', marginTop:'20px'}}>
                    <p style={{fontSize:'14px'}}>Current: {data}</p>
                    <button type='submit' style={styles.editBtn}>EDIT</button>
            </span>
            <p style={{fontSize:'14px', marginTop:'20px', alignSelf:'flex-start'}}>
                <strong style={{color:'darkred'}}>Warning: </strong>
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

const styles = {
    editBtn:{
        padding:'5px 20px',
        border:'1px solid #2f2f2f',
        borderRadius:'10px',
        backgroundColor:'#1b1b1b',
        color:'white',
        alignSelf:'flex-end',
        cursor:'pointer'
    },
    updated:{
        padding:'5px 10px',
        marginTop:'10px',
        backgroundColor:'#0e7947',
        borderRadius:'10px',
        textAlign:'center',
        marginBottom:'15px'
    },
    error: {
        padding:'5px 10px',
        marginTop:'10px',
        backgroundColor:'#ff5050',
        borderRadius:'10px',
        textAlign:'center',
        marginBottom:'15px'
    },
    select:{
        marginTop:'10px'
    }
}