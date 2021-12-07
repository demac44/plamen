import React from 'react'

const PostMedia = ({data}) => {
    return (
        <div className='post-media-box flex-ctr'>
            {data.type==='image' && <img style={styles.media} src={data.url} alt=""/>}
            {data.type==='video' && <video style={styles.media} controls src={data.url}/>}
        </div>
    )
}

export default PostMedia


const styles = {
    media:{
        maxHeight:'70vh',
        maxWidth:'100%'
    }
}