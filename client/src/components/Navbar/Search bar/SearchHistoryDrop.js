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
            <div className='search-hist-title flex-sb'>
                <p>Search history</p>
                <p onClick={handleClear} className='search-hist-clear-btn'>Clear all</p>
            </div>
        <div className='searchHis-drop flex-col-ctr'>
            {
                searchHistory.search_history.map(s =>         
                <Link to={'/search/'+s} key={s} className='search-history-box'>
                    <p>{s}</p>
                </Link>)
            }
        </div>
        </>
    )
}

export default SearchHistoryDrop
