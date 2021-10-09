import React from 'react'
import { NavLink } from 'react-router-dom'

const LoginForm = () => {
    return (
        <div>
            <h1>Login</h1>
            <p>Enter your details below to continue</p>
            <form className="entry-form flex-col-ctr" action="" method="POST">
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
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
