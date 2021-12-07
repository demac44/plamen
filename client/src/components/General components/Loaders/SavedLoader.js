import React from 'react'
import Navbar from '../../Navbar/Navbar'
import PostLoader from './PostLoader'
import Sidebar from '../Sidebar'

const SavedLoader = () => {
    return (
        <>
            <Navbar callback={()=>{return}} isLogged={true}/>
            <div className='wrapper'>
                <div className='main'>
                    <Sidebar/>
                    <div className='posts-container-feed'>
                        <h2 style={styles.title}>Saved posts</h2>
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
