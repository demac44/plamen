import React, { useEffect, useState } from 'react'

const ActivityStatus = ({last_seen}) => {
    const [lastSeen, setLastSeen] = useState('')


    useEffect(()=>{
        setLastSeen(getTime(last_seen))
    }, [last_seen])

    return (
        <div className='flex-ctr' style={{marginLeft:'20px'}}>
            <span className='activity_light' style={{backgroundColor: lastSeen==='online' ? 'green' : 'red'}}></span>
            <p style={{fontSize:'12px'}}>{lastSeen==='online' ? 'Online' : 'Last online '+lastSeen}</p>
        </div>
    )
}

export default ActivityStatus

const getTime = (timestamp) => {
    let utcSeconds = parseInt(timestamp);
    utcSeconds = new Date(utcSeconds).getTime()
    let d = Date.now() - utcSeconds
    d = Math.floor((d/1000)/60)
    if(d===0) return 'online'
    else if (d<3) return 'online'
    else if(d<60 && d>3) return d+'m ago'
    else if(d>60 && d<60*24) return Math.floor(d/60)+'h ago'
    else if(d>60*24 && d<60*24*30) return Math.floor(d/(60*24))+'d ago'
    else if(d>60*24*30) {
        let d = new Date(utcSeconds)
        return d.toDateString()
    }
}