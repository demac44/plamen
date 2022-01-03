import React from 'react'
import { Link } from 'react-router-dom'

const NoPosts = () => {
    return (
        <div className='flex-col-ctr no-posts-box'>
            <p>No new posts</p>
            <br/>
            <Link to='/explore' className='btn'>Explore</Link>
        </div>
    )
}

export default NoPosts