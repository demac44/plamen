import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import gql from 'graphql-tag';
import {useQuery} from 'react-apollo';
import bcrypt from 'bcryptjs'


const USER_QUERY = gql`
    query {
        users {
            email
            pass
    }
}`;


const LoginForm = () => {
    let password, email;
    const [passErr, setPassErr] = useState(false)
    const [emailErr, setEmailErr] = useState(false)


    const {data, loading, error} = useQuery(USER_QUERY)


    if (loading) return 'loading'
    if (error) console.log(error);

    const auth = (email, password) => {
        let email_found = false
        data.users.map(user => {
            if (user.email === email){
                email_found = true
                bcrypt.compare(password, user.pass, (err, isMatch)=>{
                    if (err) {
                        throw err
                    } else if (isMatch) {
                        setEmailErr(false)
                        setPassErr(false)
                        console.log('Logged in');
                        return
                    } else {
                        setPassErr(true)
                        setEmailErr(false)
                        console.log('Password incorrect');
                        return
                    }
                })
                return
            }
            if (!email_found) {
                setPassErr(false)
                setEmailErr(true)
            }
            return
        })
        return
    }
    
    const handleLogin = async (e) => {
        e.preventDefault()
        auth(email.value, password.value)
    }


    return (
        <div>
            <h1>Login</h1>
            <p>Enter your details below to continue</p>
            {passErr && <div className='error-msg'><p>Incorrect password!</p></div>}
            {emailErr && <div className='error-msg'><p>This email does not exist!</p></div>}
            <form className="entry-form flex-col-ctr" onSubmit={handleLogin}>
                <input type="email" ref={value => email = value} id='email' placeholder="Email"/>
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