import React from 'react'

import {Link} from 'react-router-dom'

const NotFound = () => {
    return (
        <div style={styles.container} className='flex-col-ctr'>
            <h1 style={{fontSize:'50px'}}>Error 404</h1>
            <p style={{fontSize:'20px'}}>Page not found</p>
            <Link to='/feed'>
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
        backgroundColor:'white'
    },
    returnBtn:{
        padding:'5px 20px',
        backgroundColor:'#ffbb00',
        marginTop:'20px',
        borderRadius:'10px',
        cursor:'pointer',
        color:'black'
    }
}