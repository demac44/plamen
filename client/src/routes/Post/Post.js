import React, {useState, useEffect, useCallback} from 'react'
import { useParams } from 'react-router'

import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/General components/Sidebar'

const GET_POST = gql`
    query ($postID: Int!){
        get_post (postID: $postID){
            postID
            post_text
            date_posted
            url
            userID
            first_name
            last_name
            username
            profile_picture
        }
    }
`

const Post = ({isLogged}) => {
    const {postid} = useParams()
    const [leftnav, setLeftnav] = useState(false)
    const [updated, setUpdated] = useState(false)
    const {data, loading, refetch} = useQuery(GET_POST, {
        variables:{postID: parseInt(postid)}
    })
    
    const leftNavCallback = useCallback(val =>{
        setLeftnav(val)
    }, [setLeftnav])

    const updatedCallback = useCallback(val => {
        setUpdated(val)
    }, [setUpdated])

    useEffect(()=>{
        if(updated){
            refetch()
            setUpdated(false)
        }
    }, [updated, refetch])
    

    if(loading) return <div className='wh-100'>p</div>

    const post = data.get_post

    return (
        <>
            <Navbar callback={leftNavCallback} isLogged={isLogged}/>
            <div className='wrapper'> 
                <div className='single-post-main flex-col-ctr' >
                    {isLogged && <Sidebar show={leftnav}/>}
                    <h2 style={styles.title}>Post by @{post.username}</h2>
                </div>
            </div>
        </> 
    )
}

export default Post


const styles = {
    title:{
        width:'60%',
        padding:'20px',
        backgroundColor:'#111827',
        color:'white',
        textAlign:'center',
        borderRadius:'10px'     
    }
}