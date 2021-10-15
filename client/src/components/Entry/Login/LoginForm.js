import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import ErrorMsg from '../ErrorMsg';

const LoginForm = () => {
    let password, username;
    const [errorMsg, setErrorMsg] = useState('')


    const handleLogin = async (e) => {
        e.preventDefault()


        username = username.value
        password = password.value

        if (username === '' || password === ''){
            setErrorMsg('Please fill in all fields')
            return
        }
        try {
            axios({
                method: 'POST',
                url: 'http://localhost:5000/api/login',
                data: {
                    username: username,
                    password: password
                }
            }).then(res => {
                if(res?.data.error) setErrorMsg(res.data.error)    
                else {
                    localStorage.setItem('token', res?.data.token)
                    window.location.href = '/myprofile'}
            })
        } catch (error) {
            console.log(error);
        }
    }

    
    return (
        <div>
            <h1>Login</h1>
            <p>Enter your details below to continue</p>
            {errorMsg !== '' && <ErrorMsg message={errorMsg}/>}
            <form className="entry-form flex-col-ctr" onSubmit={handleLogin}>
                <input type="text" ref={value => username = value} id='username' name='username' placeholder="Username or email"/>
                <input type="password" ref={value => password = value} id='password' name='password' placeholder="Password"/>
                <a href="#">Forgot your password?</a>
                <button className="entry-btn btn" type="submit">LOGIN</button>
            </form>
            <div className="entry-link flex-ctr">
                <h6>Don't have an account?</h6>                
                <NavLink exact to="/register">Register now</NavLink>
            </div>
        </div>
    )
}

export default LoginForm
