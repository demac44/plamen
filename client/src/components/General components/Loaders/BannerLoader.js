import React from 'react'

const BannerLoader = () => {
    return (
        <div style={styles.banner}>
        </div>
    )
}

export default BannerLoader


const styles = {
    banner:{
        width:'100%',
        height:'250px',
        boxShadow:'5px 5px 10px',
        borderRadius:'10px',
        backgroundColor:'#2f2f2f'
    }
}