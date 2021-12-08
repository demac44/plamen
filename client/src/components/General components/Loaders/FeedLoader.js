import React from 'react'

import '../../../App.css'
import '../../../General.css'
import Navbar from '../../Navbar/Navbar'
import PostLoader from './PostLoader'
import Sidebar from '../Sidebar'

import StoriesLoader from './StoriesLoader'

const FeedLoader = () => {
    return (
        <>
            <Navbar callback={()=>{return}} isLogged={true}/>
            <div className='wrapper'>
                <div className='container-main'>
                    <Sidebar/>
                    <div className='container-left'>
                        <StoriesLoader/>
                        <PostLoader/>
                    </div>
                </div>

            </div>
        </>
        )
    }

export default FeedLoader
