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
    const [val, setVal] = useState('')
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
        !chat && document.querySelector('.wrapper').addEventListener('click', ()=>{setVal('');setDropdown(false)}) 
        val.trim().length > 0 ? setDropdown(true) : setDropdown(false)  
    }, [val, chat])

    if(loading) return (
        <div className='tn-center flex-ctr'><div className="search-icon">
            <i className="fas fa-search"></i></div>
            <input className='tn-search-input' style={{borderRadius:'0 50px 50px 0'}} placeholder='search'/>
        </div>)

    if (error) console.log(error.message);

    const handleInput = (e) => {
        setVal(e.target.value)
    }
    

    return (
        <>
            <form className="tn-center flex-ctr" onSubmit={(e)=>{e.preventDefault(); window.location.href='/search/'+val}}>
                <div className="search-icon"><i className="fas fa-search"></i></div>
                <input 
                    type="text" 
                    className="tn-search-input" 
                    value={val} 
                    onChange={handleInput} 
                    placeholder='Search' 
                    style={{borderRadius: val.length < 1 ? '0 50px 50px 0' : '0'}} 
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
                {val.length>0 && <i className='fas fa-times' style={styles.closeIcon} onClick={()=>setVal('')}></i>}
                {dropdown && <SearchDrop dropdownCallback={dropdownCallback} chat={chat} data={data} searchHistory={searchHistory} val={val.replace(/\s/g, '')}/>}
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