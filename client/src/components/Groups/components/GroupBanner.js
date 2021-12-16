import React, {memo} from 'react'
import JoinBtn from './JoinBtn'

const GroupBanner = ({info, user, updatedCallback}) => {
    return (
        <div className='group-banner'>
            <img style={styles.bannerImage} src={info.banner_image} alt=''/>
            <span style={styles.nameBar}>
                <h1>{info.group_name}</h1>
            </span>
            <JoinBtn info={info} user={user} updatedCallback={updatedCallback}/>
        </div>
    )
}

export default memo(GroupBanner) 

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
        padding:'10px 120px 10px 15px',
        backgroundColor:'rgba(0,0,0,0.9)',
        color:'white',
        zIndex:'10',
        wordWrap: 'break-word'
    }
}