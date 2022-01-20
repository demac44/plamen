import axios from 'axios'
import React, { useEffect, useState } from 'react'

const SearchUniversity = ({setUniCB}) => {
    const [query, setQuery] = useState('')
    const [universities, setUniversities] = useState([])

    const func = async () => {
        axios.get("http://localhost:8000/api/universities").then(res => setUniversities(res?.data))
    }
    useEffect(()=>{
        func()
    }, [])

    return (
        <span className='search-uni-box flex-ctr'>
            <input 
                type='text' 
                placeholder='Find your university...'
                className='input'
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
            />
            {query!=='' && <i className='fas fa-times' onClick={()=>setQuery('')}/>}
            {query.length > 0 &&
            <div className='uni-search-drop' onClick={()=>setQuery('')}>
                {filterRes(universities, query)?.slice(0,50)?.map(uni => <p onClick={()=>{setUniCB(uni.name);setQuery('')}} key={uni.name}>{uni.name}</p>)}
            </div>}
        </span>
    )
}

export default SearchUniversity


const filterRes = (data, str) => {
    if(data?.length <1) return []
    return data?.filter(uni => {
        return uni?.name?.toLowerCase().includes(str.toLowerCase()) 
    })
}