import React, { useState } from 'react'
import SetTime from '../../General components/SetTime'
import SavePostButton from './components/SavePostButton'
import PostMenu from './components/PostMenu'
import Avatar from '../../General components/Avatar'
import { Link } from 'react-router-dom'

const PostTopBar = ({data}) => {
    const [menu, setMenu] = useState(false)

    return (
        <>
            <div className='post-top-bar'>
                <Link to={'/profile/'+data.userID} className='flex'>
                    <Avatar size='40px' image={data.pfp}/>

                    <span className='flex-col-sb' style={styles.nameAndTime}>
                        <p style={styles.name}>{data.name}</p>
                        <SetTime timestamp={data.timestamp}/>
                    </span>
                </Link >

                <span className='flex'>
                    <SavePostButton postID={data.postID}/>
                    <i 
                        className="fas fa-ellipsis-v" 
                        style={styles.optionsBtn} 
                        onClick={()=>setMenu(!menu)}></i>
                </span>
            </div>

            {menu && <PostMenu data={{
                postID: data.postID,
                userID: data.userID
            }}/>}
        </>
    )
}

export default PostTopBar


const styles = {
    name:{
        fontSize:'16px'
    },
    optionsBtn:{
        fontSize:'30px',
        color:'white',
        marginRight:'15px'
    },
    nameAndTime:{
        height:'100%',
        marginLeft:'10px',
        color:'white'
    }
}