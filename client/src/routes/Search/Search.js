import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'

import Navbar from '../../components/Navbar/Navbar.js'
import UserSearchBar from '../../components/Navbar/UserSearchBar'
import Sidebar from '../../components/General components/Sidebar.js'
import AlternativeNavbar from '../../components/General components/AlternativeNavbar.js'
import MyGroupsList from '../../components/General components/MyGroupsList.js'
import UserSuggestionsBox from '../../components/General components/UserSuggestionsBox.js'

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


const Search = ({isLogged}) => {
    const {query} = useParams()
    const [users, setUsers] = useState([])
    const [fetch, setFetch] = useState(true)

    const {loading, data, error, fetchMore} = useQuery(SEARCH_USERS, {
        variables:{
            limit:15,
            offset:0
        }
    })

    useEffect(()=>{
        handleSearchHistory(query)
        data?.get_users && setUsers(filterUsers(data, query))
    }, [data, query])
    
    if(loading) return <div className='wh-100'>sta ima</div>
    if(error) throw error 
    
    const loadMore = () => {
        fetchMore({
            variables:{
                offset:users.length,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                if(fetchMoreResult.get_users.length < 1) {
                    setFetch(false)
                    return
                }
                return Object.assign({}, prev, {
                  users: [...users, ...fetchMoreResult.get_users]
                });
              }
        })
    }

    return (
        <>
            <Navbar isLogged={isLogged}/> 
            <AlternativeNavbar/>
            <div className='wrapper'>
                <Sidebar/>
                <div className='container-main'>
                    <div className='container-left'>
                        <p style={styles.title}>Search results</p>
                        {users.length < 1 ? <p style={{color:'white'}}>No results</p>
                        : users.map(user => <UserSearchBar user={user} key={user.userID}/>)}
                        {fetch && <div style={styles.loadMore} onClick={loadMore}>Load more</div>}
                    </div>
                    <div className='container-right' style={styles.containerRight}>
                        <MyGroupsList/>
                        <UserSuggestionsBox/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search

const styles = {
    title:{
        marginBottom:'20px',
        color:'white',
        width:'100%',
        padding:'20px',
        backgroundColor:'#1b1b1b',
        textAlign:'center',
        borderRadius:'10px'
    },
    loadMore:{
        width:'100%',
        padding:'5px',
        textAlign:'center',
        backgroundColor:'#1b1b1b',
        color:'white',
        cursor:'pointer',
        marginTop:'10px',
        borderRadius:'10px'
    },
    containerRight:{
        position:'fixed', 
        top:'80px', 
        right:'20px', 
        padding:'0 10px'
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

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

const handleSearchHistory = (query) => {
    const sh = JSON.parse(localStorage.getItem('search-history'))
    localStorage.setItem('search-history', JSON.stringify({search_history:[...sh.search_history, query].filter(onlyUnique)}))
    return null
}