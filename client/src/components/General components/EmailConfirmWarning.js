import React from 'react'

const EmailConfirmWarning = () => {
    return (
        <div className='email_confirm_warning flex-col-ctr'>
            <p>The code has been sent to your email. You need to confirm it within 7 days after registration!</p>
            <span className='flex-ctr'>
                <button className='btn'>CONFIRM</button>
                <h5>Resend</h5>
            </span>
        </div>
    )
}

export default EmailConfirmWarning
