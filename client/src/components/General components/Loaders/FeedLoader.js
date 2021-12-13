import React from 'react'

import PostLoader from './PostLoader'

import StoriesLoader from './StoriesLoader'
import NavbarLoader from './NavbarLoader'
import SidebarLoader from './SidebarLoader'

const FeedLoader = () => {
    return (
        <>
            <NavbarLoader/>
            <div className='wrapper'>
                <div className='container-main'>
                    <SidebarLoader/>
                    <div className='container-left'>
                        <StoriesLoader/>
                        <PostLoader/>
                    </div>
                    <div className='container-right'>
                        <PostLoader/>
                    </div>
                </div>

            </div>
        </>
        )
    }

export default FeedLoader
