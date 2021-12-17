import React, { useEffect, useState, memo } from 'react'
import { Link } from 'react-router-dom'
import ChatSearchBarUser from '../Chat/components/ChatSearchBarUser'
import SearchHistoryDrop from './SearchHistoryDrop'
import UserSearchBar from './UserSearchBar'

const SearchDrop = ({data, query, chat, searchHistory, dropdownCallback}) => {
    const [users, setUsers] = useState([])

    
    useEffect(()=>{
        setUsers(filterUsers(data, query))
    }, [query, data])


    return (
        <div className='search-drop'>
            {(query.length<1 && !chat) && <SearchHistoryDrop dropdownCallback={dropdownCallback} searchHistory={searchHistory}/>}
            {chat ? users.map(user => <ChatSearchBarUser user={user} key={user.userID}/>)
                : users.map(user => <UserSearchBar user={user} key={user.userID}/>)}
            {(users.length > 0 && !chat) && <Link to={'/search/'+query}><p style={styles.seeAll}>See all</p></Link>}
        </div>
    )
}

export default memo(SearchDrop)


const styles = {
    seeAll:{
        width:'100%',
        textAlign:'center',
        color:'white',
        padding:'5px',
    }
}


const filterUsers = (data, query) => {
    if(query.length <= 0) return []
    return data.get_users.filter((user)=> {
        const str1 = user.first_name+user.last_name+user.username
        const str2 = user.first_name+user.username+user.last_name

        const str3 = user.last_name+user.username+user.first_name
        const str4 = user.last_name+user.first_name+user.username

        const str5 = user.username+user.first_name+user.last_name
        const str6 = user.username+user.last_name+user.first_name

        const str = (str1+str2+str3+str4+str5+str6).toLowerCase()

        return str.includes(query) 
                || query.includes(user.last_name.toLowerCase()) 
                || query.includes(user.first_name.toLowerCase())
                || query.includes(user.username.toLowerCase())
            
    })
}
