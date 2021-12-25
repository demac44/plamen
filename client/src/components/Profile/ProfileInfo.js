import React, { useState, useCallback, useEffect, memo } from 'react'
import ActivityStatus from '../General components/ActivityStatus.js'
import UsersList from '../General components/Users list/UsersList.js'

const ProfileInfo = ({info, last_seen, blocked}) => {  
    const [follows, setFollows] = useState([])
    const [title, setTitle] = useState('')
    const [showList, setShowList] = useState(false)


    useEffect(()=>{
        document.querySelector('body').style.overflowY = (showList ? 'hidden' : 'auto')
        return
    }, [info, showList])

    const closeList = useCallback(() => {
        setShowList(false)
      }, [setShowList]);


    const handleOpen = (type) => {
        setFollows(type)
        setShowList(true)
    }


    return (
        <>
            {showList && <UsersList data={follows} title={title} closeList={closeList}/>}
            <div className="profile-top-box-info flex-col-ctr">
                
                <span className='name-and-status-pf'>
                    <h4 style={styles.name}>{info.user.first_name+' '+info.user.last_name}</h4>    
                    {!blocked && <ActivityStatus last_seen={last_seen}/>}
                </span>

                <h5 style={styles.username}>@{info.user.username}</h5>

                {!blocked && <div className='status-991px'>
                    <ActivityStatus last_seen={last_seen}/>
                </div>}

                <div className='profile-top-box-stats flex-sb'>
                    <div 
                        onClick={()=>{
                            handleOpen(info.following)
                            setTitle('Following')
                        }}
                        style={styles.followsDiv}
                        >
                        <h6>Following</h6>
                        <p>{info.following.length}</p>
                    </div>

                    <div 
                        onClick={()=>{
                            handleOpen(info.followers)
                            setTitle('Followers')
                        }}
                        style={styles.followsDiv}
                        >
                        <h6>Followers</h6>
                        <p>{info.followers.length}</p>
                    </div>

                    <div style={{textAlign:'center'}}>
                        <h6>Posts</h6>
                        <p>{info.postsLength}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(ProfileInfo)

const styles = {
    name:{
        fontSize:'30px'
    },
    username:{
        fontSize:'16px'
    },
    followsDiv:{
        textAlign:'center',
        cursor:'pointer'
    }
}