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
    const [dropdown, setDropdown] = useState(false)
    const [val, setVal] = useState('')
    const {loading, error, data} = useQuery(SEARCH_USERS)

    useEffect(()=>{
        document.querySelector('.wrapper').addEventListener('click', ()=>setVal('')) 
        val.trim().length > 0 ? setDropdown(true) : setDropdown(false)
    }, [val])

    if(loading) return <div className='tn-center flex-ctr'><input className='tn-search-input' placeholder='search'/></div>
    if(error) throw error

    const handleInput = (e) => {
        setVal(e.target.value)
    }
    

    return (
        <>
            <form className="tn-center flex-ctr" onSubmit={(e)=>{e.preventDefault(); window.location.href='/search/'+val}}>
                <div className="search-icon"><i className="fas fa-search"></i></div>
                <input type="text" className="tn-search-input" value={val} onChange={handleInput} placeholder='Search'/>
                {dropdown && <SearchDrop data={data} val={val.replace(/\s/g, '')}/>}
            </form>
        </>
    )
}

export default SearchBar
