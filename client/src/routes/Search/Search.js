import React, {useState, useEffect, useCallback} from 'react'
import { useParams } from 'react-router'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'

import Navbar from '../../components/Navbar/Navbar.js'
import UserSearchBar from '../../components/Navbar/UserSearchBar'
import Loader from '../../components/UI/Loader'
import LeftNavbar from '../../components/UI/LeftNavbar.js'

const SEARCH_USERS = gql`
    query ($limit: Int, $offset: Int) {
         users (limit: $limit, offset: $offset){
            userID
            first_name
            last_name
            username
            profile_picture
    }
}`


const Search = ({isLogged}) => {
    const {query} = useParams()
    const [regex, setRegex] = useState('')
    const [users, setUsers] = useState([])
    const [leftnav, setLeftnav] = useState(false)
    const [fetch, setFetch] = useState(true)

    const leftNavCallback = useCallback(val =>{
        setLeftnav(val)
    }, [setLeftnav])


    const {loading, data, error, fetchMore} = useQuery(SEARCH_USERS, {
        variables:{
            limit:15,
            offset:0
        }
    })
    
    const setusers = () => {
        let arr=[]
        data?.users.map(user => 
            (user.first_name.match(regex)
            || user.last_name.match(regex)
            || user.username.match(regex)
            || (user.first_name+user.last_name).match(regex)
            || (user.last_name+user.first_name).match(regex))
            && arr.push(user) 
            )
        setUsers(arr)
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }

    const handleSearchHistory = () => {
        const sh = JSON.parse(localStorage.getItem('search-history'))
        localStorage.setItem('search-history', JSON.stringify({search_history:[...sh.search_history, query].filter(onlyUnique)}))
    }

    useEffect(()=>{
        handleSearchHistory()
        setRegex(new RegExp(escape(query), 'gi'))
        setusers()
    }, [data, query])
    
    if(loading) return <div className='wh-100'><Loader/></div>
    if(error) throw error 
    

    return (
        <>
            <Navbar callback={leftNavCallback} isLogged={isLogged}/> 
            <div className='wrapper'>
                <div className='main'>
                    <LeftNavbar show={leftnav}/>
                    <div className='search-container'>
                        <p style={styles.title}>Search results</p>
                        {users.length < 1 ? <p style={{color:'white'}}>No results</p> : users.map(user => <UserSearchBar user={user} key={user.userID}/>)}
                        {fetch && <div style={styles.loadMore} onClick={()=>{
                            fetchMore({
                                variables:{
                                    offset:users.length,
                                },
                                updateQuery: (prev, { fetchMoreResult }) => {
                                    if (!fetchMoreResult) return prev;
                                    if(fetchMoreResult.users.length < 1) {
                                        setFetch(false)
                                        return
                                    }
                                    return Object.assign({}, prev, {
                                      users: [...users, ...fetchMoreResult.users]
                                    });
                                  }
                            })
                        }}>Load more</div>}
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
    }
}


