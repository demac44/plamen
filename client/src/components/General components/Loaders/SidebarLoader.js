import React from 'react'

const SidebarLoader = () => {
    return (
        <div style={styles.sidebar} className='flex-col'>
            <div style={styles.li} key={1}></div>
            <div style={styles.li} key={2}></div>
            <div style={styles.li} key={3}></div>
            <div style={styles.li} key={4}></div>
            <div style={styles.li} key={5}></div>
            <div style={styles.li} key={6}></div>
        </div>
    )
}

export default SidebarLoader


const styles = {
    sidebar:{
        position:'fixed',
        top:'70px',
        left:'0',
        width:'300px',
        height:'100vh',
        padding:'20px'
    },
    li:{
        width:'70%',
        height:'20px',
        backgroundColor:'#3f3f3f',
        marginTop:'30px',
        borderRadius:'20px'
    }
}