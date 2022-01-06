import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../../images/logo-min.png'

const NotFound = () => {
    return (
        <div className='flex-col-ctr overlay'>
            <img src={logo} style={{position:'absolute', top:'10px', left:'30px'}} alt=''/>
            <h1 style={{fontSize:'50px', color:'white'}}>Error 404</h1>
            <p style={{fontSize:'20px', color:'white'}}>Page not found</p>
            <Link to='/'>
                <button style={{backgroundColor:'lightblue', marginTop:'20px'}} className='btn'>RETURN TO MAIN PAGE</button>
            </Link>
        </div>
    )
}

export default NotFound