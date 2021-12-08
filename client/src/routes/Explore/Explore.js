import React, { useCallback, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import MyGroupsList from '../../components/General components/MyGroupsList'
import Posts from '../../components/Post/Posts'
import Sidebar from '../../components/General components/Sidebar'

import FeedLoader from '../../components/General components/Loaders/FeedLoader'
import AlternativeNavbar from '../../components/General components/AlternativeNavbar'

const Explore = ({isLogged}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const {loading, data, error, refetch} = useQuery(RANDOM_POSTS)

    useEffect(()=>{
        window.scrollTo(0,0)
    }, [])

    if(loading) return <FeedLoader/>
    if(error) console.log(error); 

    return (
        <>
            <Navbar isLogged={isLogged}/>
            <AlternativeNavbar/>
            <div className='wrapper'>
                <div className='container-main'>
                    <Sidebar/>
                    <div className='container-left'>
                        <div style={styles.title}><h2>Explore</h2></div>
                        <Posts posts={data.random_posts} refetchPosts={refetch}/>
                        <div 
                            onClick={()=>{
                                window.scrollTo(0,0);
                                refetch()
                            }} 
                            style={styles.reloadBox} 
                            className='flex-col-ctr'
                        >
                            <p>Go again? Click!</p>
                            <br/>
                            <i class="fas fa-redo"></i>
                        </div>
                    </div>
                </div>
                <div className='container-right' style={styles.containerRight}>
                    <MyGroupsList/>
                </div>
            </div>
        </>
    )
}

export default Explore


const RANDOM_POSTS = gql`
    query{
        random_posts{
            postID
            post_text
            date_posted
            url
            userID
            first_name
            last_name
            username
            profile_picture
            type
        }
    }
`

const styles = {
    containerRight:{
        position:'fixed', 
        top:'80px', 
        right:'20px', 
        padding:'0 10px'
    },
    title:{
        width:'100%',
        padding:'20px',
        boxShadow:'5px 5px 10px black',
        borderRadius:'10px',
        color:'white',
        textAlign:'center'
    },
    reloadBox:{
        width:'100%',
        height:'150px',
        color:'white',
        cursor:'pointer',
        boxShadow:'5px 5px 10px black',
        borderRadius:'10px',
        backgroundColor:'#1f1f1f',
        marginTop:'20px'

    }
}