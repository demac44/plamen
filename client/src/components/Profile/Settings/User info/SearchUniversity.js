import React, { useState } from 'react'
import {universities} from '../../../../Assets/universities.js'

const SearchUniversity = ({setUniCB}) => {
    const [query, setQuery] = useState('')

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