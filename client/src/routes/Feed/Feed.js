import React from 'react'
import Post from '../../components/Feed/Posts/Post'
import Stories from '../../components/Feed/Stories/Stories'
import AddPost from '../../components/Feed/Posts/Post components/Functional components/AddPost'
import Navbar from '../../components/Navbar/Navbar'
import LeftNavbar from '../../components/UI/LeftNavbar'

const Feed = () => {
    return (
        <div>
            <Navbar/>
            <div className='main'>
                <LeftNavbar/>
                <div className='posts-container-feed'>
                    <Stories/>
                    <AddPost width='100%'/>
                    <Post/>
                </div>
            </div>
        </div>
    )
}

export default Feed
