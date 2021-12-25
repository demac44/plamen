import React, { useEffect, useState } from 'react'

import { cities } from '../../../../../Assets/cities'

const CitiesSelect = ({country, setCityCB}) => {
    let i = 0;
    const [str, setStr] = useState('')
    const [list, setList] = useState([])

    useEffect(()=>{
        setList(filterRes(cities[`${country}`], str)?.filter(onlyUnique))
    }, [country, str])


    return (
        <span style={{width:'100%', position:'relative'}}>
            <input style={styles.input} className='input' value={str} onChange={(e)=>setStr(e.target.value)}/>

            {str?.length > 0 && <div className='select-city-drop'>
                {list?.length > 0 && list?.map(city => <p onClick={()=>setCityCB(city)} key={i++}>{city}</p>)}
            </div>}
        </span>
    )
}

export default CitiesSelect

const filterRes = (country, str) => {
    if(country?.length <1) return []
    return country?.filter(city => {
        return city.toLowerCase().includes(str.toLowerCase()) 
                || str.toLowerCase().includes(city.toLowerCase())
    })
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

const styles = {
    input:{
        width:'98%',
        margin:'5px',
    }
}