import React from 'react'
import { Link } from 'react-router-dom'

const SearchHistoryDrop = ({searchHistory, dropdownCallback}) => {

    const handleClear = () => {
        localStorage.removeItem('search-history')
        localStorage.setItem('search-history', JSON.stringify({search_history:[]}))
        dropdownCallback()
    }

    return (
        <>
            <div style={styles.title}>
                <p>Search history</p>
                <p onClick={handleClear} style={styles.clearBtn}>Clear all</p>
            </div>
        <div className='searchHis-drop flex-col-ctr'>
            {
                searchHistory.search_history.map(s =>         
                <Link to={'/search/'+s} key={s} className='sh-box'>
                    <p>{s}</p>
                </Link>)
            }
        </div>
        </>
    )
}

export default SearchHistoryDrop

const styles = {
    title:{
        padding:'5px 10px',
        display:'flex',
        justifyContent:'space-between',
        borderBottom:'1px solid #ddd'
    },
    clearBtn:{
        fontSize:'14px',
        color:'teal',
        cursor:'pointer'
    }
}