import React, { useCallback, useState } from 'react'
import SetTime from '../../General components/SetTime'
import SavePostButton from './components/SavePostButton'
import PostMenu from './components/PostMenu'
import Avatar from '../../General components/Avatar'
import { Link } from 'react-router-dom'
import ReportBox from './components/ReportBox'

const PostTopBar = ({data, refetchPosts, isLogged}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [menu, setMenu] = useState(false)
    const [reportMenu, setReportMenu] = useState(false)

    const handleReport = useCallback((val) => {
        setReportMenu(val)
    }, [setReportMenu])

    return (
        <>
            <div className='post-top-bar'>
                <Link to={'/profile/'+data.username} className='flex'>
                    <Avatar size='40px' image={data.pfp}/>

                    <span className='flex-col-sb' style={styles.nameAndTime}>
                        <p style={styles.name}>{data.name}</p>
                        <SetTime timestamp={data.timestamp}/>
                    </span>
                </Link >

                <span className='flex'>
                    <SavePostButton postID={data.postID} isLogged={isLogged}/>
                    <i 
                        className="fas fa-ellipsis-v" 
                        style={styles.optionsBtn} 
                        onClick={()=>setMenu(!menu)}></i>
                </span>
            </div>

            {(isLogged && menu) && 
            <span onClick={()=>setMenu(false)}>
                <PostMenu 
                refetchPosts={refetchPosts}
                handleReport={handleReport}
                data={{
                    postID: data.postID,
                    userID: data.userID,
                }}/>
            </span>}
            {reportMenu && <ReportBox data={data} handleReportClose={handleReport}/>}
        </>
    )
}

export default PostTopBar


const styles = {
    name:{
        fontSize:'16px'
    },
    optionsBtn:{
        fontSize:'25px',
        color:'white',
        marginRight:'5px',
        cursor:'pointer'
    },
    nameAndTime:{
        height:'100%',
        marginLeft:'10px',
        color:'white'
    }
}