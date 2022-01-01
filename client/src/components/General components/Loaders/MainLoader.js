import React from 'react'

import logo from '../../../images/logo.png'
import './style.css'

const MainLoader = () => {
    return (
        <div className='flex-ctr main-loader'>
            <img src={logo} className='main-loader-logo' alt=''/>
        </div>
    )
}

export default MainLoader