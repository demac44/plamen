import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchHistoryDrop from './SearchHistoryDrop'
import UserSearchBar from './UserSearchBar'

const SearchDrop = ({data, val, chat, searchHistory, dropdownCallback}) => {
    const [regex, setRegex] = useState(null)
    const [users, setUsers] = useState([])

    const setusers = () => {
        let arr=[]
        regex && data.users.map(user => 
            (user.first_name.match(regex)
            || user.last_name.match(regex)
            || user.username.match(regex)
            || (user.first_name+user.last_name).match(regex)
            || (user.last_name+user.first_name).match(regex))
            && arr.push(user) 
        )
        setUsers(arr)
    }
    
    useEffect(()=>{
        setRegex(new RegExp(escape(val), 'gi'))
        setusers() 
    }, [val])


    return (
        <div className='search-drop'>
            {val.length<1 && <SearchHistoryDrop dropdownCallback={dropdownCallback} searchHistory={searchHistory}/>}
            {users.map(user => <UserSearchBar chat={chat} user={user} key={user.userID}/>)}
            {(users.length > 0 && !chat) && <Link to={'/search/'+val}><p className='see-all-btn'>See all</p></Link>}
        </div>
    )
}

export default SearchDrop
