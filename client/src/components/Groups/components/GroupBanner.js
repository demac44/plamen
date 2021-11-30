import React from 'react'

const GroupBanner = ({info}) => {
    return (
        <div className='group-banner'>
            <img style={styles.bannerImage} src={info.banner_image}/>
            <span style={styles.nameBar}>
                <h1>{info.group_name}</h1>
            </span>
            <button className='group-join-btn btn'>JOIN</button>
        </div>
    )
}

export default GroupBanner 

const styles = {
    bannerImage:{
        width:'100%',
        height:'100%',
        position:'absolute',
        top:'0',
        left:'0',
        zIndex:'9'
    },
    nameBar:{
        position:'absolute',
        bottom:'0',
        left:'0',
        width:'100%',
        padding:'10px 160px 10px 15px',
        backgroundColor:'rgba(0,0,0,0.9)',
        color:'white',
        zIndex:'10',
        wordWrap: 'break-word'
    }
}