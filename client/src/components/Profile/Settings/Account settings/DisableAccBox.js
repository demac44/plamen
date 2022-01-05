import React, { useState } from 'react'
import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'
import './style.css'

const DisableAccBox = ({uid}) => {
    const [disable, setDisable] = useState(false)
    const [deleteAcc, setDeleteAcc] = useState(false)
    const [disable_account] = useMutation(DISABLE_ACCOUNT)
    const [delete_account] = useMutation(DELETE_ACCOUNT)
    const [deleteError, setDeleteError] = useState(null)
    const [disableError, setDisableError] = useState(null)
    const [passDisable, setPassDisable] = useState('')
    const [passDelete, setPassDelete] = useState('')

    const handleDisable = () => {
        disable_account({
            variables:{
                userID: uid,
                pass: passDisable
            }
        }).then(res=>{
            if (res?.data?.disable_account?.error){
                setDisableError(res?.data?.disable_account?.error)
            } else {
                localStorage.clear()
                window.location.href = '/login'
            }
        })
    }

    const handleDelete = () => {
        delete_account({
            variables:{
                userID: uid,
                pass: passDelete
            }
        }).then(res=>{
            if (res?.data?.delete_account?.error){
                setDeleteError(res?.data?.delete_account?.error)
            } else {
                localStorage.clear()
                window.location.href = '/login'
            }
        })
    }


    return (
        <div className='disable-acc-box flex-col-ctr box'>

            <div className='flex-col-ctr disable-del-btn' onClick={()=>setDisable(!disable)}>
                <h4>Temporarily disable account</h4>
            </div>

            {disable && 
            <>
                <p>
                    By confirming you will temporarily disable your account. Next time you log in you will enable it again!
                </p>

                {disableError && <p className='err-msg'>{disableError}</p>}

                <input 
                    type='password'
                    className='input' 
                    id='passDisable' 
                    placeholder='Enter your password'
                    onFocus={()=>setDisableError(null)}
                    onChange={(e)=>setPassDisable(e.target.value)}
                />

                <span style={{marginTop:'10px'}} className='flex'>
                    <p type='submit' onClick={handleDisable} className='btn conf-exit-btns'>Confirm</p>
                    <p className='btn conf-exit-btns' onClick={()=>setDisable(false)}>Exit</p>
                </span>
            </>}


            <div className='disable-del-btn' onClick={()=>setDeleteAcc(!deleteAcc)}>
                <h4>Delete account</h4>
            </div>

            {deleteAcc && 
            <>
                <p>
                    By confirming you will permanently delete your account! You will not be able to retrieve your it after this action!
                </p>

                {deleteError && <p className='err-msg'>{deleteError}</p>}

                <input 
                    type='password'
                    className='input' 
                    id='passDelete' 
                    placeholder='Enter your password'
                    onFocus={()=>setDeleteError(null)}
                    onChange={(e)=>setPassDelete(e.target.value)}
                />

                <span style={{marginTop:'10px'}} className='flex'>
                    <p className='btn conf-exit-btns' onClick={handleDelete}>Confirm</p>
                    <p className='btn conf-exit-btns' onClick={()=>setDeleteAcc(false)}>Exit</p>
                </span>
            </>}
        </div>
    )
}

export default DisableAccBox

const DISABLE_ACCOUNT = gql`
    mutation ($userID: Int!, $pass: String!){
        disable_account (userID: $userID, password: $pass){
            error
        }
    }
`

const DELETE_ACCOUNT = gql`
    mutation ($userID: Int!, $pass: String!){
        delete_account(userID: $userID, password: $pass){
            error
        }
    }
    
`