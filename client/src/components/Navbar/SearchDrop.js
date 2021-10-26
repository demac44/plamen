import React, { useEffect, useState } from 'react'
import UserSearchBar from './UserSearchBar'

const SearchDrop = ({data, val}) => {
    const [regex, setRegex] = useState('')


    useEffect(()=>{
        setRegex(new RegExp(escape(val), 'gi'))
    }, [val])

    return (
        <div className='search-drop'>
            {data.users.map(user => 
                (user.first_name.match(regex)
                || user.last_name.match(regex)
                || user.username.match(regex)
                || (user.first_name+user.last_name).match(regex)
                || (user.last_name+user.first_name).match(regex)) 
                && <UserSearchBar user={user}/>)}
        </div>
    )
}

export default SearchDrop
