import React from 'react'
import LoginForm from './LoginForm'


const LoginPopUp = () => {
    return (
        <div className='login-popup flex-ctr'>
            <div className='entry-form-box'>
                <LoginForm popup={true}/>
            </div>
        </div>
    )
}

export default LoginPopUp
