import React from 'react'

import logo from '../../../images/logo.png'

const MainLoader = () => {
    return (
        <div style={{...styles.loaderContainer, position:'relative'}} className='flex-ctr'>
            <img src={logo} style={styles.logo}/>
        </div>
    )
}

export default MainLoader


const styles = {
    loaderContainer:{
        position:'fixed',
        width:'100vw',
        height:'100vh',
        backgroundColor:'#1b1b1b',
        zIndex:'100000000000000000000000000000000000000000'
    },
    logo:{
        height:'80px'
    }
}