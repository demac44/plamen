import React from 'react'
import { Link } from 'react-router-dom'
import logoImg from '../../images/logo-min.png'

const Logo = () => {
    return (
        <Link to='/' className='logo flex-ctr'>
            <img src={logoImg}/>
            <h1  className='logo-text'>plamen</h1>
        </Link>
    )
}

export default Logo