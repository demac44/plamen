import React, { useState, useEffect } from 'react'

const SetTime = ({timestamp, fontSize}) => {
    const [time, setTime] = useState('')

    useEffect(()=>{
        return setTime(getTime(timestamp))
    }, [timestamp])

    return (
        <p style={{fontSize: fontSize}} className='set-time-p'>{time}</p>
    )
}

export default SetTime

const getTime = (timestamp) => {
    let utcSeconds = parseInt(timestamp);
    utcSeconds = new Date(utcSeconds).getTime()
    let d = Date.now() - utcSeconds
    d = Math.floor((d/1000)/60)
    if(d===0) return 'Now'
    else if(d<60) return d+'m'
    else if(d>60 && d<60*24) return Math.floor(d/60)+'h'
    else if(d>60*24 && d<60*24*30) return Math.floor(d/(60*24))+'d'
    else if(d>60*24*30) {
        let d = new Date(utcSeconds)
        return d.toDateString()
    }
}