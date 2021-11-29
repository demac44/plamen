import React from 'react'

const CreateGroupCard = () => {
    return (
        <div className='group-card flex-ctr' style={{backgroundColor: "#" + ((1<<24)*Math.random() | 0).toString(16)}}>
            <div className='gcard_overlay flex-ctr'>
                <i className='fas fa-plus'></i>
            </div>
        </div>
    )
}

export default CreateGroupCard
