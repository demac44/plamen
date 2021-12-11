import React, { useState, useCallback } from 'react'
import UsersList from '../General components/Users list/UsersList.js'

const ProfileInfo = ({info}) => {  
    const [follows, setFollows] = useState([])
    const [title, setTitle] = useState('')
    const [showList, setShowList] = useState(false)



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
            <div className="profile-top-box-info">

                <h4 style={styles.name}>{info.user.first_name+' '+info.user.last_name}</h4>    
                <h5 style={styles.username}>@{info.user.username}</h5>

                <div className='profile-top-box-stats'>
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

export default ProfileInfo

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