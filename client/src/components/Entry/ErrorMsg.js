import React from 'react'

import '../../App.css'

const ErrorMsg = ({message}) => {
    return (
        <div className='error-msg'><p>{message}</p></div>
    )
}

export default ErrorMsg
