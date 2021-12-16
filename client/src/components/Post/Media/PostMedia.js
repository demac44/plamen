import React, { useState, memo } from 'react'

import '../../General components/General.css'

const PostMedia = ({data}) => {
    const [loading, setLoading] = useState(true)

    return (
        <div className='post-media-box flex-ctr'>
            {data.type==='image' && (
                <>
                {loading && <div className='flex-ctr' style={styles.loader} ><div className='small-spinner'></div></div>}
                <img style={styles.media} onLoad={()=>setLoading(false)} src={data.url} alt=""/>
                </>
            )}
            {data.type==='video' && <video style={styles.media} controls src={data.url}/>}
        </div>
    )
}

export default memo(PostMedia)


const styles = {
    media:{
        maxHeight:'70vh',
        maxWidth:'100%'
    },
    loader:{
        position:'absolute',
        height:'100%',
        minHeight:'300px',
        width:'100%',
        zIndex:'10000',
        backgroundColor:'#1b1b1b'
    }
}