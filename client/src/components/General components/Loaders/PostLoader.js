import React from 'react'

const PostLoader = () => {
    return (
        <>
            <div className='add-np-box' style={styles.addNP}>
                <div style={styles.input}></div>
            </div>
            <div className='post' style={{width:'100%', marginTop:'20px'}}>
                <div style={styles.topBar}></div>
                <div style={styles.postImg}></div>
                <div style={styles.cmt}></div>
            </div>
            <div className='post' style={{width:'100%', marginTop:'20px'}}>
                <div style={styles.topBar}></div>
                <div style={styles.postImg}></div>
                <div style={styles.cmt}></div>
            </div>
        </>
    )
}

export default PostLoader


const styles = {
    topBar:{
        width:'100%',
        height:'50px',
        backgroundColor:'#1b1b1b',
        borderRadius:'20px 20px 0 0'
    },
    postImg:{
        width:'100%',
        height:'350px',
        background:'#3f3f3f',
    },
    cmt:{
        width:'100%',
        height:'50px',
        backgroundColor:'#1b1b1b',
        borderRadius:'0 0 20px 20px '
    },
    addNP:{
        width:'100%',
        height: '150px',
        borderRadius:'20px',
        backgroundColor:'#1b1b1b',
        marginTop:'20px',
        padding:'10px',
        boxShadow:'5px 5px 10px'
    },
    input:{
        width:'100%',
        height:'80px',
        background:'#3f3f3f',
    }
}