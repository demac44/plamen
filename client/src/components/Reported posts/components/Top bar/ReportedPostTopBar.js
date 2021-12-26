import React, { useCallback, useState, memo } from 'react'
import SetTime from '../../../General components/SetTime'
import Avatar from '../../../General components/Avatar'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ReportedPostMenu from './components/ReportedPostMenu'


const ReportedPostTopBar = ({data, refetchPosts}) => {
    const [menu, setMenu] = useState(false)

    return (
        <>
            <div className='post-top-bar flex-sb'>
                <Link to={'/profile/'+data.username} className='flex'>
                    <Avatar size='40px' image={data.pfp}/>

                    <span className='flex-col-sb' style={styles.nameAndTime}>
                        <p style={styles.name}>{data.name}</p>
                        <SetTime timestamp={data.timestamp} fontSize='12px'/>
                    </span>
                </Link >

                <span className='flex'>
                    <FontAwesomeIcon
                        icon='ellipsis-v' 
                        style={styles.optionsBtn} 
                        onClick={()=>setMenu(!menu)}/>
                </span>
            </div>

            {menu && <span onClick={()=>setMenu(false)}>
                <ReportedPostMenu 
                refetchPosts={refetchPosts}
                data={{
                    userID: data.userID,
                    groupID: data.groupID
                }}/>
            </span>}
        </>
    )
}

export default memo(ReportedPostTopBar)


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