import React, { useEffect, useState } from 'react'
import FollUserBox from './FollUserBox'

const ShowFollows = ({follows, ft, CBShowFollows}) => {
    const [showFollows, setShowFollows] = useState(true)

    console.log(follows);

    useEffect(()=>{
        CBShowFollows(showFollows)
    },[CBShowFollows, showFollows])

    return (
        <div className='follows-wrapper flex-col-ctr'>
            <div className='foll-exit' onClick={()=>setShowFollows(false)}>
                <h2 className='foll-type'>{ft}</h2>
                <i className='fas fa-times'></i>
            </div>
            <div className='follows-box'>
                {follows.length === 0 && <p className='no-follows'>No users to show</p>}
                {follows.map(user => <FollUserBox user={user} key={user.userID}/>)}
            </div>
        </div>
    )
}

export default ShowFollows
