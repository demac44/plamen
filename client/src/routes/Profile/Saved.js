import React, {useEffect} from 'react'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import Navbar from '../../components/Navbar/Navbar'
import SavedLoader from '../../components/General components/Loaders/SavedLoader'
import MyGroupsList from '../../components/General components/MyGroupsList'

import Posts from '../../components/Post/Posts'
import Sidebar from '../../components/General components/Sidebar'
import AlternativeNavbar from '../../components/General components/AlternativeNavbar'
import NoPosts from '../../components/General components/NoPosts'
import UserSuggestionsBox from '../../components/General components/UserSuggestionsBox'

const Saved = ({isLogged}) => {
    const ls = JSON.parse(localStorage.getItem('user'))

    const {loading, data, error, fetchMore} = useQuery(GET_SAVED, { 
        variables: {
            userID: ls.userID,
            offset:0,
            limit:15
        },
    })

    useEffect(()=>{
        window.scrollTo(0,0)
    }, [])

    if(loading) return <SavedLoader/>
    if(error) console.log(error);

    const scrollPagination = () => {
        window.onscroll = async ()=>{
            if(Math.round(window.scrollY+window.innerHeight) >= document.body.scrollHeight-100){
                try {
                    await fetchMore({
                        variables:{
                            offset:data.get_saved_posts.length,
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;
                            return Object.assign({}, prev, {
                              get_saved_posts: [...data.get_saved_posts, ...fetchMoreResult.get_saved_posts]
                            });
                          }
                    })
                } catch {}
            }
        }
    }

    return (
        <>
            <Navbar isLogged={isLogged}/>
            <AlternativeNavbar/>
            <div className='wrapper' onLoad={scrollPagination}>
                <div className='container-main'>
                    <Sidebar/>
                    <div className='container-left'>
                        <h2 style={styles.title}>Saved posts</h2>
                        {data.get_saved_posts.length > 0 ? <Posts posts={data.get_saved_posts}/>
                            : <NoPosts/>}
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

export default Saved

const styles = {
    title: {
        color:'white',
        backgroundColor:'#1b1b1b',
        width:'100%',
        padding:'20px',
        borderRadius:'10px',
        textAlign:'center',
        boxShadow:'5px 5px 10px black'
    },
    containerRight:{
        position:'fixed', 
        top:'80px', 
        right:'0', 
        padding:'0 10px',
        maxHeight: '85vh',
        overflowY: 'scroll',
        marginRight:'-17px'
    }
}

const GET_SAVED = gql`
    query ($userID: Int!, $offset: Int, $limit: Int){
        get_saved_posts(userID:$userID, offset:$offset, limit:$limit){
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
