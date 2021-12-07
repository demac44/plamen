import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
    return (
        <Link to='/feed' className='logo'>
            <h1>SoMeApp<span>.com</span></h1>
        </Link>
    )
}

export default Logo
