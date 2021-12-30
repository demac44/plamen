import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import MyGroupsList from '../../components/General components/MyGroupsList'
import Posts from '../../components/Post/Posts'
import Sidebar from '../../components/General components/Sidebar'

import AlternativeNavbar from '../../components/General components/AlternativeNavbar'
import UserSuggestionsBox from '../../components/General components/UserSuggestionsBox'
import PostLoader from '../../components/General components/Loaders/PostLoader'
import { useSelector } from 'react-redux'

const Explore = ({isLogged}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const {loading, data, error, refetch} = useQuery(RANDOM_POSTS, {pollInterval:9000000, variables:{uid}})

    useEffect(()=>{
        window.scrollTo(0,0)
    }, [])

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
                        {loading ? <PostLoader/> : <Posts posts={data.random_posts} refetchPosts={refetch}/>}
                        <div 
                            onClick={()=>{
                                window.scrollTo(0,0);
                                refetch()
                            }} 
                            style={styles.reloadBox} 
                            className='flex-col-ctr'
                        >
                            <p>Refresh?</p>
                            <br/>
                            <i style={{fontSize:'20px'}} className="fas fa-redo"></i>
                        </div>
                    </div>
                </div>
                <div className='container-right' style={styles.containerRight}>
                    <MyGroupsList/>
                    <UserSuggestionsBox/>
                </div>
            </div>
        </>
    )
}

export default Explore


const RANDOM_POSTS = gql`
    query($uid: Int!){
        random_posts(userID: $uid){
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
        right:'0', 
        padding:'0 10px',
        maxHeight: '85vh',
        overflowY: 'scroll',
        marginRight:'-17px'
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