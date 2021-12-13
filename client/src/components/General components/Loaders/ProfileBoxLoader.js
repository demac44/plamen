import React from 'react'

const ProfileBoxLoader = () => {
    return (
        <div style={styles.profileBox}>
            <div style={styles.avatar}></div>
            <div style={styles.barsCont}>
                <div style={styles.nameBar}></div>
                <div style={styles.usernameBar}></div>
            </div>
            <div style={styles.btn}></div>
        </div>
    )
}

export default ProfileBoxLoader


const styles = {
    profileBox:{
        position:'relative',
        width:'100%',
        height:'250px',
        backgroundColor:'#1b1b1b',
        borderRadius:'20px',
        display:'flex',
        alignItems:'center',
        padding:'20px 30px',
        boxShadow:'5px 5px 10px'
    },
    avatar:{
        width:'200px',
        height:'200px',
        background:'#3f3f3f',
        borderRadius:'50%'
    },
    nameBar:{
        width:'200px',
        background:'#3f3f3f',
        height:'20px',
        borderRadius:'10px'
    },
    usernameBar:{
        width:'100px',
        background:'#3f3f3f',
        height:'15px',
        marginTop:'15px',
        borderRadius:'10px'
    },
    barsCont:{
        display:'flex', 
        flexDirection:'column',
        alignItems:'flex-start',
        height:'60%',
        marginLeft:'30px'
    },
    btn:{
        position:'absolute',
        right:'20px',
        bottom:'15px',
        background:'#3f3f3f',
        width:'180px',
        height:'45px',
        borderRadius:'30px'
    }
}