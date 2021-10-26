import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserSearchBar from './UserSearchBar'

const SearchDrop = ({data, val}) => {
    const [regex, setRegex] = useState('')
    const [users, setUsers] = useState([])


    useEffect(()=>{
        setRegex(new RegExp(escape(val), 'gi'))
        setusers()
    }, [val])

    const setusers = () => {
        let arr=[]
        data.users.map(user => 
            (user.first_name.match(regex)
            || user.last_name.match(regex)
            || user.username.match(regex)
            || (user.first_name+user.last_name).match(regex)
            || (user.last_name+user.first_name).match(regex))
            && arr.push(user) 
        )
        setUsers(arr)
    }

    return (
        <div className='search-drop'>
            {users.slice(0,10).map(user => <UserSearchBar user={user} key={user.userID}/>)}
            {users.length > 0 && <Link to={'/search/'+val}><p className='see-all-btn'>See all</p></Link>}
        </div>
    )
}

export default SearchDrop
