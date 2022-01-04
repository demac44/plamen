import React, { useEffect, useState } from 'react'
import { cities } from '../../../../../Assets/cities'
import './style.css'

const CitiesSelect = ({country, setCityCB}) => {
    let i = 0;
    const [str, setStr] = useState('')
    const [list, setList] = useState([])

    useEffect(()=>{
        setList(filterRes(cities[`${country}`], str)?.filter(onlyUnique))
    }, [country, str])


    return (
        <span className='search-cities-box'>
            <input className='input' value={str} onChange={(e)=>setStr(e.target.value)} placeholder='Find your city...'/>

            {str?.length > 0 && <div className='uni-search-drop'>
                {list?.length > 0 && list?.slice(0,50)?.map(city => <p onClick={()=>setCityCB(city)} key={i++}>{city}</p>)}
            </div>}
        </span>
    )
}

export default CitiesSelect

const filterRes = (country, str) => {
    if(country?.length <1) return []
    return country?.filter(city => {
        return city.toLowerCase().includes(str.toLowerCase()) 
    })
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
