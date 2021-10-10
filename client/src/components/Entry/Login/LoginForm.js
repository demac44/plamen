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
    const [passErr, setPassErr] = useState(false)
    const [emailErr, setEmailErr] = useState(false)
    const [validationErr, setValidationErr] = useState(false)


    const {data, loading, error} = useQuery(USER_QUERY)


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
                        setEmailErr(false)
                        setPassErr(false)
                        setValidationErr(false)
                        console.log('Logged in');
                        return
                    } else {
                        setPassErr(true)
                        setEmailErr(false)
                        setValidationErr(false)
                        console.log('Password incorrect');
                        return
                    }
                })
                return
            }
            if (!user_found) {
                setPassErr(false)
                setValidationErr(false)
                setEmailErr(true)
            }
            return
        })
        return
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        if (username.value === '' || password.value === ''){
            setValidationErr(true)
        } else {
            auth(username.value, password.value)
        }
    }


    return (
        <div>
            <h1>Login</h1>
            <p>Enter your details below to continue</p>
            {passErr && <ErrorMsg message='Password is incorrect'/>}
            {emailErr && <ErrorMsg message="Username or email does not exist"/>}
            {validationErr && <ErrorMsg message='Please fill in all fields'/>}
            <form className="entry-form flex-col-ctr" onSubmit={handleLogin}>
                <input type="text" ref={value => username = value} id='username' placeholder="Email"/>
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