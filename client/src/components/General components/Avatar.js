import React from 'react'
import defaultAvatarImage from '../../images/pfp.jpg'

const Avatar = ({size, image}) => {
    return (
        <div className='user-avatar flex-ctr' style={{width:size, height:size, minWidth:size}}>
            <img src={image ? image : defaultAvatarImage} style={styles.image} alt=""/>
        </div>
    )
}

export default Avatar


const styles = {
    image:{
        height:'100%',
        width:'100%'
    }
}