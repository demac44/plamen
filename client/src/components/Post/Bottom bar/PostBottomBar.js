import React from 'react'
import AddComment from './components/AddComment'
import LikePost from './components/LikePost'

const PostBottomBar = ({data}) => {
    return (
        <div className='post-bottom-bar'>
            <LikePost data={data}/>
            <p style={styles.seeLikes}>See likes</p>
            <AddComment data={data}/>
        </div>
    )
}

export default PostBottomBar

const styles = {
    seeLikes:{
        padding:'5px',
        fontSize:'12px',
        minWidth:'60px',
        color:'white',
        border:'1px solid #3f3f3f',
        borderRadius:'10px',
        textAlign:'center',
        cursor:'pointer',
    }
}