import React, { useCallback, useEffect, useState } from 'react'

import {gql} from 'graphql-tag'
import {useQuery} from 'react-apollo'
import SearchDrop from './SearchDrop'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const SearchBar = ({chat, isLogged, handleOpen}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [dropdown, setDropdown] = useState(false)
    const [searchHistory, setSearchHistory] = useState([])
    const [query, setQuery] = useState('')
    const {loading, error, data} = useQuery(SEARCH, {
        variables:{
            limit:5,
            offset:0,
            userID: ls.userID
        }
    })

    const dropdownCallback = useCallback(()=>{
        setDropdown(false)
    }, [setDropdown])

    useEffect(()=>{
        !chat && document.querySelector('.wrapper').addEventListener('click', ()=>{setQuery('');setDropdown(false)}) 
        query.trim().length > 0 ? setDropdown(true) : setDropdown(false)  
    }, [query, chat])

    if (error) console.log(error.message);

    return (
        <>
            <form className="tn-center flex-ctr" onSubmit={(e)=>{e.preventDefault(); window.location.href='/search/'+query}}>
                <div className="search-icon"><FontAwesomeIcon icon='search' color='#1f1f1f'/></div>
                <input 
                    type="text" 
                    className="tn-search-input" 
                    onChange={(e)=>setQuery(e.target.value)} 
                    placeholder='Search'
                    value={query}
                    style={{borderRadius: query.length < 1 ? '0 50px 50px 0' : '0'}} 
                    disabled={!isLogged && true}
                    onFocus={()=>{
                        handleOpen()
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
                {query.length>0 && 
                <div style={styles.closeIcon} className='flex-ctr'>
                    <FontAwesomeIcon icon='times' onClick={()=>setQuery('')} size='lg'/>
                </div>}
                {(!loading && dropdown) && <SearchDrop 
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
        backgroundColor:'white',
        height:'80%',
        width:'50px',
        borderRadius:'0 50px 50px 0',
        cursor:'pointer'
    }
}

const SEARCH = gql`
    query ($limit: Int, $offset: Int, $userID: Int!) {
         get_users (limit: $limit, offset: $offset, userID: $userID){
            userID
            first_name
            last_name
            username
            profile_picture
        }
        get_all_groups (limit: $limit, offset: $offset) {
            groupID
            group_name
            banner_image
        }
    }
`