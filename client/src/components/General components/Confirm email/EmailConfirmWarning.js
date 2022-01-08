import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const EmailConfirmWarning = () => {
    const email = useSelector(state => state?.isAuth?.user?.email)
    return (
        <div className='email_confirm_warning flex-col-ctr'>
            <p>The code has been sent to your email. You need to confirm it within 7 days after registration!</p>
            <span className='flex-ctr'>
                <Link to={{pathname:'verify_email', 
                    state:{
                        email: email
                    }}}><button className='btn'>CONFIRM</button>
                </Link>
                <h5>Resend</h5>
            </span>
        </div>
    )
}

export default EmailConfirmWarning
