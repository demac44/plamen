import React from 'react'

const ReasonsBar = ({reasons}) => {
    return (
        <div className='tags-box'>
            {reasons.slice(0,-1).split('\n').map(reason => <p className='tag report-tag' key={reason}>{reason}</p>)}
        </div>
    )
}

export default ReasonsBar