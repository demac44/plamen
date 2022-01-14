import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import logo from '../../images/logo-min.jpg'

const GenerateToken = () => {
    const [email, setEmail] = useState('')
    const [sent, setSent] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleReset = () => {
        setLoading(true)
        axios({
            method: 'POST',
            url: '/api/reset_password',
            data: {
                email
            },
            withCredentials: true
        }).then(res=>{
            setLoading(false)
            if(res?.data?.error) setError(res.data.error)
            else {
                setEmail('')
                setSent(true)
            }
        })
    }

    return (
        <div className='overlay flex-col-ctr'>
            <div className='retrieve_pass_box flex-col-ctr'>
                <img src={logo} alt=''/>
                <h2>Forgot your password?</h2>
                <p>Enter your email below and we will send you a link to reset your password.</p>
                <label htmlFor='email'>EMAIL ADDRESS</label>
                <input 
                    type='text' 
                    name='email' 
                    id='email' 
                    placeholder='Email...'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    onFocus={()=>{setSent(false);setError(false)}}
                />
                {loading && <div className='small-spinner'></div>}
                {sent && <p className='sent-msg'>Link has been sent to your email!</p>}
                {error && <p className='err-msg'>{error}</p>}
                <button onClick={handleReset}>RESET PASSWORD</button>
                <Link to='/login'>Go back</Link>
            </div>
        </div>
    )
}

export default GenerateToken
