import React, {useState, useEffect, useCallback} from 'react'
import { useParams } from 'react-router'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'

import Navbar from '../../components/Navbar/Navbar.js'
import UserSearchBar from '../../components/Navbar/UserSearchBar'
import Loader from '../../components/UI/Loader'
import LeftNavbar from '../../components/UI/LeftNavbar.js'

const SEARCH_USERS = gql`
    query {
         users{
            userID
            first_name
            last_name
            username
            profile_picture
    }
}`


const Search = () => {
    const {query} = useParams()
    const [regex, setRegex] = useState('')
    const [users, setUsers] = useState([])
    const [leftnav, setLeftnav] = useState(false)

    const leftNavCallback = useCallback(val =>{
        setLeftnav(val)
    }, [setLeftnav])


    const {loading, data} = useQuery(SEARCH_USERS)
    
    useEffect(()=>{
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
        setRegex(new RegExp(escape(query), 'gi'))
        setusers()
    }, [data, query, regex])
    
    if(loading) return <div className='wh-100'><Loader/></div>
    

    return (
        <>
            <Navbar callback={leftNavCallback}/>
            <div className='wrapper'>
                <div className='main'>
                    <LeftNavbar show={leftnav}/>
                    <div className='posts-container-feed'>
                        <p style={{marginBottom:'40px', color:'whitesmoke'}}>Search results</p>
                        {users.length < 1 ? <p style={{color:'white'}}>No results</p> : users.map(user => <UserSearchBar user={user} key={user.userID}/>)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search
