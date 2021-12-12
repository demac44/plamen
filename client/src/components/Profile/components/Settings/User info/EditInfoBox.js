import React, { useState } from 'react'

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'

const EditInfoBox = ({data}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [updated, setUpdated] = useState(false)
    const [update_info] = useMutation(UPDATE_INFO)

    const handleEditInfo = (e) => {
        e.preventDefault()

        const job = e.target.job.value
        const uni = e.target.uni.value
        const hs = e.target.hs.value
        const num = e.target.num.value



        update_info({
            variables:{
                userID: ls.userID,
                job,
                uni,
                hs,
                num
            }
        }).then(()=>setUpdated(true))
    }

    return (
        <form style={styles.box} className='flex-col-ctr edit-user-info-box' onSubmit={handleEditInfo}>
            <p style={{padding:'10px', textAlign:'center'}}>Edit info</p>

            {updated && <p style={styles.updated}>Your info is updated!</p>}

            <div className='flex-ctr'>
                <h5>Job</h5>
                <input type='text' className='input' id='job' placeholder='Edit job' defaultValue={data.job}/>
            </div>

            <div className='flex-ctr'>
                <h5>University</h5>
                <input type='text' className='input' id='uni' placeholder='Edit university' defaultValue={data.university}/>
            </div>            

            <div className='flex-ctr'>
                <h5>High school</h5>
                <input type='text' className='input' id='hs' placeholder='Edit high school' defaultValue={data.high_school}/>
            </div>    

            <div className='flex-ctr'>
                <h5>Phone</h5>
                <input type='text' className='input' id='num' placeholder='Edit phone number' defaultValue={data.phone_number}/>
            </div>  

            <button type='submit' style={styles.editBtn}>EDIT</button>
        </form>
    )
}

export default EditInfoBox


const styles = {
    editBtn:{
        padding:'5px 20px',
        border:'1px solid #2f2f2f',
        borderRadius:'10px',
        marginTop:'20px',
        backgroundColor:'#1b1b1b',
        color:'white',
        cursor:'pointer'
    },
    updated:{
        padding:'5px 10px',
        marginTop:'10px',
        backgroundColor:'#0e7947',
        borderRadius:'10px'
    }
}

const UPDATE_INFO = gql`
    mutation ($userID: Int!, $job: String!, $uni: String!, $hs: String!, $num: String!){
        edit_user_info (userID: $userID, job: $job, university: $uni, high_school: $hs, phone_number: $num ){
            userID
        }
    }
`