import React from 'react'
import { Link } from 'react-router-dom'
import logoImg from '../../images/logo.png'

const Logo = () => {
    return (
        <Link to='/' className='logo flex-ctr'>
            <img src={logoImg} style={styles.logoImg}/>
            <h1>plamen</h1>
        </Link>
    )
}

export default Logo


const styles = {
    logoImg:{
        height:'110%',
        marginRight:'10px'
    }
}