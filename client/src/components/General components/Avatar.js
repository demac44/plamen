import React from 'react'
import { Link } from 'react-router-dom'
import defaultAvatarImage from '../../images/pfp.jpg'

const Avatar = ({size, image}) => {
    return (
        <div className='user-avatar flex-ctr' style={{width:size, height:size}}>
            <img src={image ? image : defaultAvatarImage} style={styles.image} alt=""/>
        </div>
    )
}

export default Avatar


const styles = {
    image:{
        minHeight:'100%',
        minWidth:'100%'
    }
}