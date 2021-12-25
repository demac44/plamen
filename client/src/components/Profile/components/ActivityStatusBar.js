import React, { useEffect, useState } from 'react'

const ActivityStatusBar = ({last_seen}) => {
    const [activeStatus, setActiveStatus] = useState(false)

    useEffect(()=>{
        setActiveStatus(getTime(last_seen))
    }, [last_seen])

    return (
        <div style={{...styles.activeBar, 
                        background: activeStatus ? 'darkgreen' : 'darkred',
                         color: activeStatus ? 'darkgreen' : 'darkred'
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

const styles = {
    activeBar:{
        position:'absolute',
        top:'0',
        left:'0',
        width:'100%',
        height:'5px',
        boxShadow:'5px 5px 15px'
    }
}