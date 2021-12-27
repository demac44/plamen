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
import UserLoader from '../../components/General components/Loaders/UserLoader.js'
import CommunitySearchBar from '../../components/Navbar/CommunitySearchBar'


const Search = ({isLogged}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const {query} = useParams()
    const [users, setUsers] = useState([])
    const [fetch, setFetch] = useState(true)
    const [fetchComm, setFetchComm] = useState(true)
    const [communities, setCommunities] = useState([])

    const {loading, data, error, fetchMore} = useQuery(SEARCH_USERS, {
        variables:{
            limit:15,
            offset:0,
            userID: ls.userID
        }
    })

    useEffect(()=>{
        handleSearchHistory(query)
        setUsers(filterUsers(data?.get_users, query))
        setCommunities(filterCommunities(data?.get_all_groups, query))
    }, [data, query])
    
    if(error) throw error 
    
    const loadMore = () => {
        fetchMore({
            variables:{
                offset:data?.get_users?.length,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                if(fetchMoreResult?.get_users?.length < 1) {
                    setFetch(false)
                    return
                }
                return Object.assign({}, prev, {
                  get_users: [...data?.get_users, ...fetchMoreResult?.get_users]
                });
              }
        })
    }

    const loadMoreComm = () => {
        fetchMore({
            variables:{
                offset:data?.get_all_groups?.length,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                if(fetchMoreResult?.get_all_groups?.length < 1) {
                    setFetchComm(false)
                    return
                }
                return Object.assign({}, prev, {
                    get_all_groups: [...data?.get_all_groups, ...fetchMoreResult?.get_all_groups]
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
                    <div className='container-left flex-col-ctr'>
                        <p style={{marginBottom:'20px'}} className='box flex-ctr'>Search results</p>

                        {(users?.length>0) && <h4 style={{...styles.commTitle}}>Users</h4>}

                        {loading ? (
                            <>
                                <UserLoader key='1'/>
                                <UserLoader key='2'/>
                                <UserLoader key='3'/>
                                <UserLoader key='4'/>
                            </>
                        )
                        : (users?.length < 1 ? <p style={{color:'white'}}>No results</p>
                            : users?.map(user => <UserSearchBar user={user} key={user.userID}/>))}

                        {(!loading && fetch && users?.length>=15) && 
                            <div style={styles.loadMore} onClick={loadMore}>Load more</div>}

                        {(communities?.length>0) && <h4 style={{...styles.commTitle}}>Communities</h4>}


                        {!loading && communities?.map(community => <CommunitySearchBar 
                                                                        comm={community} 
                                                                        key={community.groupID}
                                                                        dropdownCallback={()=>{return}}
                                                                    />)}

                        {(!loading && fetchComm && communities?.length>=15) && 
                            <div style={styles.loadMore} onClick={loadMoreComm}>Load more</div>}

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
    loadMore:{
        width:'150px',
        padding:'5px',
        textAlign:'center',
        color:'white',
        cursor:'pointer',
        margin:'10px 0 10px 0',
        borderRadius:'10px',
        border:'1px solid #2f2f2f',
        fontSize:'14px'
    },
    containerRight:{
        position:'fixed', 
        top:'80px', 
        right:'20px', 
        padding:'0 10px'
    },
    commTitle:{
        width:'100%',
        textAlign:'center',
        color:'white',
        padding:'5px',
        backgroundColor:'#1f1f1f', 
        border: '1px solid #2f2f2f',
        marginBottom:'5px',
        borderRadius:'10px'
    }
}


const filterUsers = (data, query) => {
    if(query.length <= 0) return []
    return data?.filter((user)=> {
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

const filterCommunities = (data, query) => {
    if(query.length <= 0) return []
    return data?.filter(community => {
        return community.group_name.toLowerCase().includes(query.toLowerCase()) 
                || query.toLowerCase().includes(community.group_name.toLowerCase())
    })
}

const SEARCH_USERS = gql`
    query ($limit: Int!, $offset: Int!, $userID: Int!) {
         get_users (limit: $limit, offset: $offset, userID: $userID){
            userID
            first_name
            last_name
            username
            profile_picture
        }
        get_all_groups (limit: $limit, offset: $offset) {
            groupID
            group_name
            banner_image
        }
    }
`
