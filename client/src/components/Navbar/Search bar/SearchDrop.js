import React, { useEffect, useState, memo } from 'react'
import { Link } from 'react-router-dom'
import ChatSearchBarUser from '../../Chat/components/Chat users list/ChatSearchBarUser'
import CommunitySearchBar from './CommunitySearchBar'
import SearchHistoryDrop from './SearchHistoryDrop'
import UserSearchBar from './UserSearchBar'

const SearchDrop = ({data, query, chat, searchHistory, dropdownCallback}) => {
    const [users, setUsers] = useState([])
    const [communities, setCommunities] = useState([])

    useEffect(()=>{
        setUsers(filterUsers(data?.get_users, query))
        setCommunities(filterCommunities(data?.get_all_groups, query))
    }, [query, data])

    return (
        <div className='search-drop'>

            {(query.length<1 && !chat) && <SearchHistoryDrop dropdownCallback={dropdownCallback} searchHistory={searchHistory}/>}

            {chat ? users.slice(0,10).map(user => <ChatSearchBarUser user={user} key={user.userID}/>)
                : users?.slice(0, 5)?.map(user => <UserSearchBar user={user} key={user.userID} dropdownCallback={dropdownCallback}/>)}

            {(!chat && communities.length>0) && <h4 className='sb-cmnty-title flex-ctr'>Communities</h4>}

            {!chat && communities?.slice(0,5)?.map(community => <CommunitySearchBar 
                                                        comm={community} 
                                                        dropdownCallback={dropdownCallback}
                                                        key={community.groupID}
                                                    />)}
            {(users.length > 0 && !chat) && <Link to={'/search/'+query}><p className='sb-see-all-btn flex-ctr'>See all</p></Link>}
        </div>
    )
}

export default memo(SearchDrop)

const filterUsers = (data, query) => {
    if(query.length <= 0) return []
    return data.filter(user => {
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

const filterCommunities = (data, query) => {
    if(query.length <= 0) return []
    return data?.filter(community => {
        return community.group_name.toLowerCase().includes(query.toLowerCase()) 
                || query.toLowerCase().includes(community.group_name.toLowerCase())
    })
}