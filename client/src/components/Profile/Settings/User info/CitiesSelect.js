import React, { useEffect, useState } from 'react'
import './style.css'

import axios from 'axios'

const CitiesSelect = ({country, setCityCB}) => {
    const [fullList, setFullList] = useState([])
    const [str, setStr] = useState('')
    const [list, setList] = useState([])

    const func = async () => {
        await axios.get('http://localhost:8000/api/cities').then(res => setFullList(res?.data[0]))
    }
    
    useEffect(()=>{
        func()
    }, [])

    useEffect(()=>{
        setList(filterRes(fullList[`${country}`], str)?.filter(onlyUnique))
    }, [country, str])

    return (
        <span className='search-cities-box flex-ctr'>
            <input 
                className='input' 
                value={str} 
                onChange={(e)=>setStr(e.target.value)} 
                placeholder='Find your city...'/>

            {str!=='' && <i icon='fas fa-times' onClick={()=>setStr('')}/>}
            {str?.length > 0 && <div className='uni-search-drop' onClick={()=>setStr('')}>
                {list?.length > 0 && list?.slice(0,50)?.map(city => <p onClick={()=>setCityCB(city)} key={city}>{city}</p>)}
            </div>}
        </span>
    )
}

export default CitiesSelect

const filterRes = (country, str) => {
    if(country?.length <1) return []
    return country?.filter(city => {
        return city?.toLowerCase()?.includes(str?.toLowerCase()) 
    })
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
