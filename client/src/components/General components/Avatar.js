import React from 'react'

import defaultAvatarImage from '../../images/pfp.jpg'
import defaultAvatarImageMin from '../../images/pfp-min.jpg'

const Avatar = ({size, image, profile}) => {
    return (
        <div className='user-avatar flex-ctr' style={{width:size, height:size, minWidth:size}}>
            <img src={image ? image : (profile ? defaultAvatarImage : defaultAvatarImageMin)} style={styles.image} alt=""/>
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