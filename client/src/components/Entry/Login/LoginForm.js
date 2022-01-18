import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import ErrorMsg from '../ErrorMsg';

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo';

import logo from '../../../images/logo-min.jpg'

const LoginForm = ({popup}) => {
    let password, username;
    const [errorMsg, setErrorMsg] = useState('')
    const [undisable_account] = useMutation(UNDISABLE_ACCOUNT)
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        username = e.target.username.value
        password = e.target.password.value

        if (username === '' || password === ''){
            setLoading(false)
            setErrorMsg('Please fill in all fields')
            return
        }
        try {
            axios({
                method: 'POST',
                // url: 'http://localhost:8000/api/login',
                url: '/api/login',
                data: {
                    username: username,
                    password: password
                },
                withCredentials: true
            }).then(res => {
                if(res?.data.error) {setErrorMsg(res.data.error);setLoading(false)}    
                else {
                    localStorage.setItem('user', JSON.stringify(res?.data.user))
                    localStorage.setItem('search-history', JSON.stringify({search_history:[]}))
                    localStorage.setItem('recent-emojis', JSON.stringify({emojis: []}))
                    undisable_account({
                        variables:{
                            userID: res?.data?.user?.userID
                        }
                    })
                    popup ? window.location.reload() : window.location.href = '/'}
            })
        } catch (error) {
            console.log(error);
        }
    }

    
    return (
        <>
            {loading && 
                <div className='overlay flex-col-ctr' style={{backgroundColor:'rgba(0,0,0,0.9)'}}>
                    <div className='small-spinner'></div>
                    <p>Hold on...</p>
                </div>}
            <div className='entry-form-box flex-col-ctr'>
                <span style={{alignSelf:'flex-start'}}> 
                    <div className='flex-ac' style={{margin:'0 0 5px 10px'}}>
                        <img className='entry-logo-img' src={logo} alt=''/>
                        <h1>Login</h1>
                    </div>
                    <p>Enter your details below to login</p>
                </span>
                {errorMsg !== '' && <ErrorMsg message={errorMsg}/>}
                <form className="entry-form flex-col-ctr" onSubmit={handleLogin}>
                    <input type="text" ref={value => username = value} id='username' name='username' placeholder="Username or email"/>
                    <input type="password" ref={value => password = value} id='password' name='password' placeholder="Password"/>
                    <NavLink to="/reset_password">Forgot your password?</NavLink>
                    <button className="btn login-btn" type="submit">LOGIN</button>
                </form>
                <div className="entry-link flex-ctr">
                    <h6>Don't have an account?</h6>                
                    <NavLink exact to="/register">Register now</NavLink>
                </div>
            </div>
        </>
    )
}

export default LoginForm


const UNDISABLE_ACCOUNT = gql`
    mutation ($userID: Int!){
        undisable_account(userID: $userID){
            userID
        }
    }
`