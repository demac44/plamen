import React from 'react'

const NavbarLoader = () => {
    return (
        <div style={styles.navbar} className='flex-sb'>
            <div style={styles.logo}></div>
            <div style={styles.searchBar}></div>
            <div style={styles.avatar}></div>
        </div>
    )
}

export default NavbarLoader


const styles = {
    navbar:{
        width:'100%',
        height:'50px',
        padding:'5px 15px'
    },
    searchBar:{
        width:'35%',
        height:'40px',
        backgroundColor:'#3f3f3f',
        borderRadius:'30px'
    },
    avatar:{
        width:'40px',
        height:'40px',
        backgroundColor:'#3f3f3f',
        borderRadius:'50%'
    },
    logo:{
        width:'100px',
        height:'40px',
        backgroundColor:'#3f3f3f',
        borderRadius:'30px'
    }
}