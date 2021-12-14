import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import ErrorMsg from '../ErrorMsg';

import {gql} from 'graphql-tag'
import { useMutation, useQuery } from 'react-apollo';

const LoginForm = ({popup}) => {
    let password, username;
    const [errorMsg, setErrorMsg] = useState('')
    const [undisable_account] = useMutation(UNDISABLE_ACCOUNT)

    const handleLogin = async (e) => {
        e.preventDefault()


        username = e.target.username.value
        password = e.target.password.value

        if (username === '' || password === ''){
            setErrorMsg('Please fill in all fields')
            return
        }
        try {
            axios({
                method: 'POST',
                url: 'http://localhost:8000/api/login',
                data: {
                    username: username,
                    password: password
                },
                withCredentials: true
            }).then(res => {
                if(res?.data.error) setErrorMsg(res.data.error)    
                else {
                    localStorage.setItem('token', res?.data.token)
                    localStorage.setItem('user', JSON.stringify(res?.data.user))
                    localStorage.setItem('search-history', JSON.stringify({search_history:[]}))
                    undisable_account({
                        variables:{
                            userID: res?.data?.user?.userID
                        }
                    })
                    popup ? window.location.reload() : window.location.href = '/profile/'+res?.data?.user?.username}
            })
        } catch (error) {
            console.log(error);
        }
    }

    
    return (
        <div className='entry-form-box flex-col-ctr'>
            <span style={{alignSelf:'flex-start'}}> 
                <h1>Login</h1>
                <p>Enter your details below to continue</p>
            </span>
            {errorMsg !== '' && <ErrorMsg message={errorMsg}/>}
            <form className="entry-form flex-col-ctr" onSubmit={handleLogin}>
                <input type="text" ref={value => username = value} id='username' name='username' placeholder="Username or email"/>
                <input type="password" ref={value => password = value} id='password' name='password' placeholder="Password"/>
                <NavLink to="/passwordretrieve">Forgot your password?</NavLink>
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


const UNDISABLE_ACCOUNT = gql`
    mutation ($userID: Int!){
        undisable_account(userID: $userID){
            userID
        }
    }
`