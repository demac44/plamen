import React, { useEffect, useState } from 'react'

import {gql} from 'graphql-tag'
import {useQuery} from 'react-apollo'
import SearchDrop from './SearchDrop'


const SEARCH_USERS = gql`
    query {
         users{
            userID
            first_name
            last_name
            username
            profile_picture
    }
}`

const SearchBar = () => {
    const [val, setVal] = useState('')
    const {loading, error, data} = useQuery(SEARCH_USERS)


    if(loading) return <div className='tn-center flex-ctr'><input className='tn-search-input' placeholder='search'/></div>
    if(error) return <p>Something went wrong.Try later.</p>

    const handleInput = (e) => {
        setVal(e.target.value)
    }
    
    return (
        <>
            <form className="tn-center flex-ctr" onSubmit={(e)=>{e.preventDefault(); window.location.href='/search/'+val}}>
                <div className="search-icon"><i className="fas fa-search"></i></div>
                <input type="text" className="tn-search-input" value={val} onChange={handleInput} placeholder='Search'/>
                {val.trim().length > 0 && <SearchDrop data={data} val={val.replace(/\s/g, '')}/>}
            </form>
        </>
    )
}

export default SearchBar
