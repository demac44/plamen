import React from 'react'
import JoinRequest from './JoinRequest'

const JoinRequestsBox = ({requests, refetch}) => {

    return (
        <div className='box'>
            {requests?.map(req => <JoinRequest req={req} refetch={refetch} key={req.userID}/>)}
            {requests.length<1 && <p style={{textAlign:'center'}}>No requests</p>}
        </div>
    )
}

export default JoinRequestsBox
