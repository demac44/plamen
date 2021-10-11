import React from 'react'

import '../../App.css'
import '../../General.css'

const ErrorMsg = ({message}) => {
    return (
        <div className='error-msg-box flex-ctr'>
            <h6 className='error-msg'>{message}</h6>
        </div>
    )
}

export default ErrorMsg
