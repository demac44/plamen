import React from 'react'

const MainLoader = () => {
    return (
        <div style={{...styles.loaderContainer, position:'relative'}} className='flex-ctr'>
            <h1 className='loader-logo' style={{color:'white'}}>SoMeApp.com</h1>
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
    }
}