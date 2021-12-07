import React, { useEffect, useState } from 'react'
import UserBox from './UserBox'

const ShowFollows = ({follows, ft, callback, likes}) => {
    const [showList, setShowList] = useState(true)

    useEffect(()=>{
        callback(showList)
    },[callback, showList])

    return (
        <div className='user-list-wrapper flex-col-ctr'>
            <div className='list-exit' onClick={()=>setShowList(false)}>
                <h2 className='list-type'>{follows ? ft : 'Likes'}</h2>
                <i className='fas fa-times'></i>
            </div>
            <div className='user-list-box'>
                {(follows && follows.length === 0) && <p className='empty-list'>No users to show</p>}
                {(likes && likes.length === 0) && <p className='empty-list'>No likes</p>}
                {follows && follows.map(user => <UserBox user={user} key={user.userID}/>)}
                {likes && likes.map(user => <UserBox user={user} key={user.userID}/>)}
            </div>
        </div>
    )
}

export default ShowFollows
