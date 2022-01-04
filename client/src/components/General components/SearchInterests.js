import React, { useEffect, useState } from 'react'

import {interests} from '../../Assets/interests.js'

const SearchInterests = ({setInterest}) => {
    const [query, setQuery] = useState('')

    return (
        <div className='flex-ctr search-interests-box'>
            <input 
                type='text'
                placeholder='Find your interests...'
                className='input'
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
            />
            {query.length > 0 && <div className='search-interests-drop'>
                {filterInterests(interests, query).map(i => <p onClick={()=>{setInterest(i.title);setQuery('')}} key={i.title}>{i.title}</p>)}
            </div>}
        </div>
    )
}

export default SearchInterests

const filterInterests = (data, query) => {
    if(query.length <= 0) return []
    return data?.filter(i => {
        return i.title.toLowerCase().includes(query.toLowerCase()) 
                || query.toLowerCase().includes(i.title.toLowerCase())
    })
}
