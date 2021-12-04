import React from 'react'

const UserLoader = () => {
    return (
        <div style={styles.loading}>
            <div style={styles.loadAvatar}></div>
            <div>
                <div style={styles.loadName}></div>
                <div style={styles.loadUsername}></div>
            </div>
        </div>
    )
}

export default UserLoader


const styles = {
    loading:{
        width:'100%',
        height:'60px',
        display:'flex',
        padding:'5px'
    },
    loadAvatar:{
        height:'95%',
        width:'50px',
        borderRadius:'50%',
        backgroundColor:'#7f7f7f'
    },
    loadName:{
        width:'100px',
        height:'10px',
        borderRadius:'10px',
        backgroundColor:'#7f7f7f',
        marginLeft:'10px',
        marginTop:'5px'
    },
    loadUsername:{
        width:'70px',
        height:'10px',
        borderRadius:'10px',
        backgroundColor:'#7f7f7f',
        marginLeft:'10px',
        marginTop:'15px'
    }
}