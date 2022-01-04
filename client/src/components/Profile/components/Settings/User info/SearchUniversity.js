import React, { useState } from 'react'
import {universities} from '../../../../../Assets/universities.js'

const SearchUniversity = () => {
    const [query, setQuery] = useState('')

    return (
        <span className='search-uni-box'>
            <input 
                type='text' 
                placeholder='Find your university...'
                className='input'
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
            />
            {query.length > 0 &&
            <div className='uni-search-drop'>
                {filterRes(universities, query)?.slice(0,50)?.map(uni => <p key={uni.name}>{uni.name}</p>)}
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