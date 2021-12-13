import React, { useCallback, useEffect, useState } from 'react'

import {gql} from 'graphql-tag'
import {useQuery} from 'react-apollo'
import SearchDrop from './SearchDrop'


const SEARCH_USERS = gql`
    query ($limit: Int, $offset: Int) {
         get_users (limit: $limit, offset: $offset){
            userID
            first_name
            last_name
            username
            profile_picture
    }
}`

const SearchBar = ({chat, isLogged}) => {
    const [dropdown, setDropdown] = useState(false)
    const [searchHistory, setSearchHistory] = useState([])
    const [query, setQuery] = useState('')
    const {loading, error, data} = useQuery(SEARCH_USERS, {
        variables:{
            limit:10,
            offset:0
        }
    })

    const dropdownCallback = useCallback(()=>{
        setDropdown(false)
    }, [setDropdown])

    useEffect(()=>{
        !chat && document.querySelector('.wrapper').addEventListener('click', ()=>{setQuery('');setDropdown(false)}) 
        query.trim().length > 0 ? setDropdown(true) : setDropdown(false)  
    }, [query, chat])

    if(loading) return (
        <div className='tn-center flex-ctr'><div className="search-icon">
            <i className="fas fa-search"></i></div>
            <input className='tn-search-input' style={{borderRadius:'0 50px 50px 0'}} placeholder='search'/>
        </div>)

    if (error) console.log(error.message);

    return (
        <>
            <form className="tn-center flex-ctr" onSubmit={(e)=>{e.preventDefault(); window.location.href='/search/'+query}}>
                <div className="search-icon"><i className="fas fa-search"></i></div>
                <input 
                    type="text" 
                    className="tn-search-input" 
                    onChange={(e)=>setQuery(e.target.value)} 
                    placeholder='Search'
                    value={query}
                    style={{borderRadius: query.length < 1 ? '0 50px 50px 0' : '0'}} 
                    disabled={!isLogged && true}
                    onFocus={()=>{
                        setDropdown(true)
                        setSearchHistory(()=>{
                            if(JSON.parse(localStorage.getItem('search-history'))){
                                return JSON.parse(localStorage.getItem('search-history'))
                            } else {
                                localStorage.setItem('search-history', JSON.stringify({search_history:[]}))
                                return JSON.parse(localStorage.getItem('search-history'))
                            }
                        })
                    }}/>
                {query.length>0 && <i className='fas fa-times' style={styles.closeIcon} onClick={()=>setQuery('')}></i>}
                {dropdown && <SearchDrop 
                                dropdownCallback={dropdownCallback} 
                                chat={chat} data={data} 
                                searchHistory={searchHistory} 
                                query={query.replace(/\s/g, '').toLowerCase()}/>}
            </form>
        </>
    )
}

export default SearchBar

const styles ={
    closeIcon:{
        fontSize:'25px',
        color:'#1f1f1f',
        backgroundColor:'white',
        height:'80%',
        width:'50px',
        textAlign:'center',
        lineHeight:'160%',
        borderRadius:'0 50px 50px 0',
        cursor:'pointer'
    }
}