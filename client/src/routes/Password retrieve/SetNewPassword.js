import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Redirect, useParams } from 'react-router-dom'
import logo from '../../images/logo-min.png'


const SetNewPassword = () => {
    const [pass, setPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState(null)

    const {token} = useParams()

    useEffect(()=>{
        setLoading(true)
        const check = async () => {
            await axios({
                method: 'POST',
                url: '/api/reset_password/verify_token',
                data: {
                    token
                },
                withCredentials: true
            }).then(res=>{
                if(res?.data?.error || !res?.data?.email) {window.location.href='/login';return}
                else {
                    setEmail(res?.data?.email)
                    setLoading(false)
                }
            })
        }
        check().then(()=>{return})
    }, [])


    const handleReset = () => {
        setLoading(true)
        if(pass!==confirmPass){
            return
        } else {
            axios({
                method: 'POST',
            url: '/api/reset_password/set_password',
            data: {
                email,
                password: pass
            },
            withCredentials: true
        }).then(res=>{
            if(!res?.data?.error) return window.location.href='/login'
            else setError('Error!')
        })
    }}

    return (
        <>
            <div className='overlay flex-col-ctr'>
            {!loading ?
                <div className='retrieve_pass_box flex-col-ctr'>
                    <img src={logo}/>
                    <h2>Set new password</h2>
                    <p>Enter your new password below.</p>
                    <label htmlFor='email'>EMAIL ADDRESS</label>
                    <input 
                        type='password' 
                        name='pass' 
                        id='pass' 
                        placeholder='New password'
                        value={pass}
                        onChange={(e)=>setPass(e.target.value)}
                        onFocus={()=>{setError(false)}}
                        />
                    <input 
                        type='password' 
                        name='conf_pass' 
                        id='conf_pass' 
                        placeholder='Confirm password'
                        style={{marginTop:'10px'}}
                        value={confirmPass}
                        onChange={(e)=>setConfirmPass(e.target.value)}
                        onFocus={()=>{setError(false)}}
                        />
                    <button onClick={handleReset}>RESET PASSWORD</button>
                    <Link to='/login'>Go back</Link>
                </div>
                : <div className='small-spinner'></div>}
            </div>
        </>
    )
}

export default SetNewPassword
