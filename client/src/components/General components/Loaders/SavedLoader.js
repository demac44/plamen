import React from 'react'
import PostLoader from './PostLoader'
import NavbarLoader from './NavbarLoader'
import SidebarLoader from './SidebarLoader'


const SavedLoader = () => {
    return (
        <>
            <NavbarLoader/>
            <div className='wrapper'>
                <SidebarLoader/>
                <div className='container-main'>
                    <div className='container-left'>
                        <h2 style={styles.title}>Saved posts</h2>
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

export default SavedLoader

const styles = {
    title: {
        color:'white',
        backgroundColor:'#1b1b1b',
        width:'100%',
        padding:'20px',
        borderRadius:'10px',
        textAlign:'center'
    }
}
