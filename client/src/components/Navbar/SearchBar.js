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

const SearchBar = ({chat}) => {
    const [dropdown, setDropdown] = useState(false)
    const [val, setVal] = useState('')
    const {loading, error, data} = useQuery(SEARCH_USERS)

    useEffect(()=>{
        !chat && document.querySelector('.wrapper').addEventListener('click', ()=>setVal('')) 
        val.trim().length > 0 ? setDropdown(true) : setDropdown(false)  
    }, [val])

    if(loading) return (
        <div className='tn-center flex-ctr'><div className="search-icon">
            <i className="fas fa-search"></i></div>
            <input className='tn-search-input' style={{borderRadius:'0 50px 50px 0'}} placeholder='search'/>
        </div>)
    if(error) throw error

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
                    style={{borderRadius: val.length<1 ? '0 50px 50px 0' : '0'}}/>
                {val.length>0 && <i className='fas fa-times' style={styles.closeIcon} onClick={()=>setVal('')}></i>}
                {dropdown && <SearchDrop chat={chat} data={data} val={val.replace(/\s/g, '')}/>}
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