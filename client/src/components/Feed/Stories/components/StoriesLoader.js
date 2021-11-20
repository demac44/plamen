import React from 'react'

const StoriesLoader = () => {
    return (
        <div className='stories-container'>
            <div className='sc-inner'>
                <div style={styles.loadHead}></div>
                <div style={styles.loadHead}></div>
                <div style={styles.loadHead}></div>
                <div style={styles.loadHead}></div>
                <div style={styles.loadHead}></div>
                <div style={styles.loadHead}></div>
                <div style={styles.loadHead}></div>
                <div style={styles.loadHead}></div>
                <div style={styles.loadHead}></div>
                <div style={styles.loadHead}></div>            
            </div>
        </div>
    )
}

export default StoriesLoader

const styles = {
    loadHead:{
        width:'64px',
        height:'100%',
        background:'linear-gradient(to bottom right, #ccc, #7f7f7f)',
        marginLeft:'10px',
        borderRadius:'50%'
    }
}