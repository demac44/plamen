import React, { useState, useEffect } from 'react'

const SetTime = ({timestamp}) => {
    const [time, setTime] = useState('')

    useEffect(()=>{
        const getTime = () => {
            let utcSeconds = parseInt(timestamp);
            utcSeconds = new Date(utcSeconds).getTime()
            let d = Date.now() - utcSeconds
            d = Math.floor((d/1000)/60)
            if(d===0) setTime('Now')
            else if(d<60) setTime(d+'m ago')
            else if(d>60 && d<60*24) setTime(Math.floor(d/60)+'h ago')
            else if(d>60*24 && d<60*24*30) setTime(Math.floor(d/(60*24))+'d ago')
            else if(d>60*24*30) {
                let d = new Date(utcSeconds)
                setTime(d.toDateString())
            }
        }
        getTime()
    }, [timestamp])

    return (
        <p style={styles.time}>{time}</p>
    )
}

export default SetTime


const styles = {
    time:{
        fontSize:'12px'
    }
}