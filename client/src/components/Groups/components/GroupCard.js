import React from 'react'

const GroupCard = () => {
    return (
        <div className='group-card' style={{backgroundColor: "#" + ((1<<24)*Math.random() | 0).toString(16)}}>
            <div className='gcard_overlay flex-ctr'>
                <p>Group name</p>
            </div>
        </div>
    )
}

export default GroupCard
