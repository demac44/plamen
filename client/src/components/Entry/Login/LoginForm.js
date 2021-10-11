import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import gql from 'graphql-tag';
import {useQuery} from 'react-apollo';
import bcrypt from 'bcryptjs'

import ErrorMsg from '../ErrorMsg';

const USER_QUERY = gql`
    query {
        users {
            tag_name
            email
            pass
    }
}`;


const LoginForm = () => {
    let password, username;
    const {data, loading, error} = useQuery(USER_QUERY)
    const [passErr, setPassErr] = useState(false)
    const [emailErr, setEmailErr] = useState(false)
    const [validationErr, setValidationErr] = useState(false)
    const [errorMsg, setErrorMsg] = useState(false)


    const setErrorsFalse = () => {
        setPassErr(false)
        setEmailErr(false)
        setValidationErr(false)
        setErrorMsg('')
    }

    if (loading) return 'loading'
    if (error) console.log(error);

    const auth = (username, password) => {
        let user_found = false
        data.users.forEach(user => {
            if (user.email === username || user.tag_name === username){
                user_found = true
                bcrypt.compare(password, user.pass, (err, isMatch)=>{
                    if (err) {
                        throw err
                    } else if (isMatch) {
                        window.location.href='/feed'
                        return
                    } else {
                        setPassErr(true)
                        setErrorMsg('Incorrect password!')
                        return
                    }
                })
                return
            }
            if (!user_found) {
                setEmailErr(true)
                setErrorMsg("Username or email doesn't exist")
            }
            return
        })
        return
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        setErrorsFalse()

        if (username.value === '' || password.value === ''){
            setValidationErr(true)
            setErrorMsg('Please fill in all fields')
        } else {
            auth(username.value, password.value)
        }
    }


    return (
        <div>
            <h1>Login</h1>
            <p>Enter your details below to continue</p>
            {(passErr || emailErr || validationErr) && <ErrorMsg message={errorMsg}/>}
            <form className="entry-form flex-col-ctr" onSubmit={handleLogin}>
                <input type="text" ref={value => username = value} id='username' placeholder="Username or email"/>
                <input type="password" ref={value => password = value} id='password' placeholder="Password"/>
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

// if (user.email === email){
//     bcrypt.compare(password, user.pass, (err, isMatch)=>{
//         if (err) {
//             throw err
//           } else if (isMatch) {
//             console.log("Password doesn't match!")
//             setPassErr(true)
//             return
//           } else {
//             console.log("Password matches!")
//             return
//           }
//     })
// }