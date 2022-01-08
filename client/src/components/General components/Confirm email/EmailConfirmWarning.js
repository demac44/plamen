import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {gql} from 'graphql-tag'
import {useMutation} from 'react-apollo'

const EmailConfirmWarning = () => {
    const email = useSelector(state => state?.isAuth?.user?.email)
    const [send_code] = useMutation(SEND_NEW_CODE)
    const [sent, setSent] = useState(false)

    const handleSendCode = () => {
        send_code({
            variables:{
                email
            }
        }).then(()=>setSent(true))
    }

    return (
        <div className='email_confirm_warning flex-col-ctr'>
            <p>The code has been sent to your email. You need to confirm it within 7 days after registration!</p>
            <span className='flex-ctr'>
                <Link to={{pathname:'verify_email', 
                    state:{
                        email: email
                    }}}><button className='btn'>CONFIRM</button>
                </Link>

                <h5 onClick={handleSendCode}>Resend</h5>
            </span>
            {sent && <p>New code sent to {email}!</p>}
        </div>
    )
}

export default EmailConfirmWarning


const SEND_NEW_CODE = gql`
    mutation($email: String!){
        send_new_verification_code(email: $email){
            email
        }
    }
`