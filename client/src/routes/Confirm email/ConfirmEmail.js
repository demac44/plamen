import React, { useState } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import './style.css'

import {gql} from 'graphql-tag'
import {useMutation} from 'react-apollo'

const ConfirmEmail = () => {
    const [code, setCode] = useState('')
    const {state} = useLocation()
    const [verify_email] = useMutation(VERIFY_EMAIL)
    const [error, setError] = useState(false)

    if(!state?.email) return <Redirect to='/404'/>


    const handleVerify = () => {
        verify_email({
            variables:{
                email: state?.email,
                code
            }
        }).then(res=>{
            if(res?.data?.verify_email?.error) setError(true)
            else window.location.href='/'
        })
    }

    return (
        <div className='confirm-email-container flex-col-ctr'>
            <p>Code is sent to {state?.email}</p>
            <h2>Enter your code below</h2>
            {error && <h5 className='err-msg'>Incorrect code!</h5>}
            <input 
                type='text' 
                className='code_input' 
                placeholder='_ _ _ _ _ _ _ _ _ _ _'
                value={code}
                onChange={(e)=>setCode(e.target.value)}
                onFocus={()=>setError(false)}
            />
            <button className='btn' onClick={handleVerify}>CONFIRM</button>
        </div>
    )
}

export default ConfirmEmail


const VERIFY_EMAIL = gql`
    mutation ($email: String!, $code: String!){
        verify_email(email: $email, code: $code){
            error
        }
    }
`