import React, { useState } from 'react'

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'

const DisableAccBox = () => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [disable, setDisable] = useState(false)
    const [deleteAcc, setDeleteAcc] = useState(false)
    const [disable_account] = useMutation(DISABLE_ACCOUNT)
    const [delete_account] = useMutation(DELETE_ACCOUNT)

    const handleDisable = () => {
        disable_account({
            variables:{
                userID: ls.userID
            }
        }).then(()=>{
            localStorage.clear()
            window.location.href = '/login'
        })
    }

    const handleDelete = () => {
        delete_account({
            variables:{
                userID: ls.userID
            }
        }).then(()=>{
            localStorage.clear()
            window.location.href = '/login'
        })
    }


    return (
        <div style={styles.box} className='disable-acc-box flex-col-ctr'>

            <div style={styles.opt} className='flex-col-ctr' onClick={()=>setDisable(!disable)}>
                <h4>Temporarily disable account</h4>
            </div>
            {disable && 
            <>
                <h4 style={{color:'darkred', marginTop:'10px'}}>Warning:</h4>
                <p style={{color:'white', textAlign:'center'}}>
                    By confirming you will temporarily disable your account. Next time you log in you will enable it again!
                </p>
                <span style={{marginTop:'10px'}} className='flex'>
                    <p style={styles.btns} onClick={handleDisable}>Confirm</p>
                    <p style={styles.btns} onClick={()=>setDisable(false)}>Exit</p>
                </span>
            </>}


            <div style={styles.opt} onClick={()=>setDeleteAcc(!deleteAcc)}>
                <h4>Delete account</h4>
            </div>

            {deleteAcc && 
            <>
                <h4 style={{color:'darkred', marginTop:'10px'}}>Warning:</h4>
                <p style={{color:'white', textAlign:'center'}}>
                    By confirming you will permanently delete your account! You will not be able to retrieve your account!
                </p>
                <span style={{marginTop:'10px'}} className='flex'>
                    <p style={styles.btns} onClick={handleDelete}>Confirm</p>
                    <p style={styles.btns} onClick={()=>setDeleteAcc(false)}>Exit</p>
                </span>
            </>}
        </div>
    )
}

export default DisableAccBox


const styles = {
    box:{
        width:'100%',
        boxShadow:'5px 5px 10px',
        border:'1px solid #2f2f2f',
        marginTop:'15px',
        borderRadius:'5px',
        cursor:'pointer'
    },
    opt:{
        width:'100%',
        color:'darkred',
        padding:'15px',
        textAlign:'center',
        transition:'ease .3s'
    },
    btns:{
        padding:'5px 10px',
        width:'100px',
        textAlign:'center',
        border:'1px solid #2f2f2f',
        color:'white',
        borderRadius:'10px',
        fontSize:'14px',
        margin:'10px'
    }
}

const DISABLE_ACCOUNT = gql`
    mutation ($userID: Int!){
        disable_account (userID: $userID){
            userID
        }
    }
`

const DELETE_ACCOUNT = gql`
    mutation ($userID: Int!){
        delete_account(userID: $userID){
            userID
        }
    }
    
`