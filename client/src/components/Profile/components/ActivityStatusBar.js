import React from 'react'

const ActivityStatusBar = ({last_seen}) => {
    return (
        <div className='activity-bar' style={{ 
                        background: getTime(last_seen) ? 'darkgreen' : 'darkred',
                         color: getTime(last_seen) ? 'darkgreen' : 'darkred'
        }}>
        </div>
    )
}
export default ActivityStatusBar

const getTime = (last_seen) => {
    let utcSeconds = parseInt(last_seen);
    utcSeconds = new Date(utcSeconds).getTime()
    let d = Date.now() - utcSeconds
    d = Math.floor((d/1000)/60)
    if (d<3) return true
    return false
}