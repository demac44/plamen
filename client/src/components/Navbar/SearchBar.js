import React from 'react'

const SearchBar = () => {
    return (
        <>
            <div className="tn-center flex-ctr">
                <div className="search-icon"><i className="fas fa-search"></i></div>
                <input type="text" className="tn-search-input" placeholder='Search'/>
            </div>
        </>
    )
}

export default SearchBar
