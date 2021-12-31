import React from 'react'
import { Link } from 'react-router-dom'

const NoPosts = () => {
    return (
        <div className='flex-col-ctr no-posts-box' style={styles.noPosts}>
            <p>No new posts</p>
            <br/>
            <Link to='/explore' className='btn'>Explore</Link>
        </div>
    )
}

export default NoPosts

const styles = {
    noPosts:{
        width:'100%',
        height:'200px',
        color:'white'
    }, 
    exploreBtn:{
        padding:'10px 50px',
        boxShadow:'2px 2px 5px black',
        borderRadius:'10px',
        color:'white'
    }
}