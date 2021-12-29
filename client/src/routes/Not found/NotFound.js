import React from 'react'

import {Link} from 'react-router-dom'

import logo from '../../images/logo-min.png'

const NotFound = () => {
    return (
        <div style={styles.container} className='flex-col-ctr'>
            <img src={logo} style={styles.logo}/>
            <h1 style={{fontSize:'50px', color:'white'}}>Error 404</h1>
            <p style={{fontSize:'20px', color:'white'}}>Page not found</p>
            <Link to='/'>
                <p style={styles.returnBtn}>RETURN TO MAIN PAGE</p>
            </Link>
        </div>
    )
}

export default NotFound


const styles = {
    container:{
        width:'100vw',
        height:'100vh',
        position:'fixed',
        top:'0',
        left:'0',
        backgroundColor:'#1b1b1b'
    },
    returnBtn:{
        padding:'5px 20px',
        backgroundColor:'lightblue',
        marginTop:'20px',
        borderRadius:'10px',
        cursor:'pointer',
        color:'black'
    },
    logo:{
        position:'absolute',
        top:'10px',
        left:'30px'
    }
}