import React from 'react'
import InfoBox from '../../Groups/components/InfoBox'
import Navbar from '../../Navbar/Navbar'
import PostLoader from './PostLoader'
import Sidebar from '../Sidebar'

const GroupLoader = () => {
    const data=[]
    const user=[]
    return (
        <>
            <Navbar callback={()=>{return}} isLogged={true}/>
            <div className='wrapper'>
                <div className='main'>
                    <Sidebar/>
                    <div className='group-container'>
                        <div style={styles.box}></div>
                        <div className='group-posts-info'>
                            <div className='group-posts-container'>
                                <PostLoader/>
                            </div>
                            <InfoBox data={data} user={user}/>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default GroupLoader


const styles = {
    box:{
        position:'relative',
        width:'100%',
        height:'250px',
        backgroundColor:'#1b1b1b',
        borderRadius:'20px',
        display:'flex',
        alignItems:'center',
        padding:'20px 30px'
    },
}