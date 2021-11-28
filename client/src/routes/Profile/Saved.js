import React, {useCallback, useState, useEffect} from 'react'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import Post from '../../components/Feed/Posts/Post'
import Navbar from '../../components/Navbar/Navbar'
import LeftNavbar from '../../components/UI/LeftNavbar'
import Loader from '../../components/UI/Loader'


const GET_SAVED = gql`
    query ($userID: Int!, $offset: Int, $limit: Int){
        get_saves(userID:$userID, offset:$offset, limit:$limit){
            postID
            post_text
            date_posted
            url
            userID
            first_name
            last_name
            username
            profile_picture
            comments{
                commentID
                userID
                username
                comment_text
                date_commented
                profile_picture
                postID
            }
            likes{
                likeID
                postID
                userID
                username
                first_name
                last_name
                profile_picture
            }
        }
    }
`


const Saved = ({isLogged}) => {
    const [updated, setUpdated] = useState(false)
    const ls = JSON.parse(localStorage.getItem('user'))
    const [leftnav, setLeftnav] = useState(false)

    const {loading, data, error, refetch, fetchMore} = useQuery(GET_SAVED, { 
        variables: {
            userID: ls.userID,
            offset:0,
            limit:20
        },
    })
    const updatedCallback = useCallback(val => {
        setUpdated(val)
    }, [setUpdated])

    const leftNavCallback = useCallback(val =>{
        setLeftnav(val)
    }, [setLeftnav])


    useEffect(()=>{
        if(updated){
            refetch()
            setUpdated(false)
        }
    }, [updated, refetch])

    if(loading) return <div className='wh-100'><Loader/></div>
    if(error) console.log(error);

    const posts = data.get_saves

    return (
        <>
            <Navbar callback={leftNavCallback} isLogged={isLogged}/>
            <div className='wrapper' onLoad={()=>{
                window.onscroll = ()=>{
                    if(Math.round(window.scrollY+window.innerHeight) >= document.body.scrollHeight-100){
                        fetchMore({
                            variables:{
                                offset:posts.length,
                            },
                            updateQuery: (prev, { fetchMoreResult }) => {
                                if (!fetchMoreResult) return prev;
                                return Object.assign({}, prev, {
                                  get_saves: [...posts, ...fetchMoreResult.get_saves]
                                });
                              }
                        })
                    }
                }
            }}>
                <div className='main'>
                    <LeftNavbar show={leftnav}/>
                    <div className='posts-container-feed'>
                        <h2 style={styles.title}>Saved posts</h2>
                        {posts.length > 0 ? posts.map(post => <Post post={{
                            postID: post.postID,
                            post_text: post.post_text,
                            date_posted: post.date_posted,
                            url: post.url
                        }} user={{
                            userID: post.userID,
                            first_name:post.first_name,
                            last_name: post.last_name,
                            username: post.username,
                            profile_picture: post.profile_picture
                        }} comments={post.comments}
                        likes={post.likes}
                        updatedCallback={updatedCallback}
                        key={post.postID}/>) : <p style={{marginTop:'30px'}}>No saved posts</p>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Saved

const styles = {
    title: {
        color:'white',
        backgroundColor:'#111827',
        width:'100%',
        padding:'20px',
        borderRadius:'10px',
        textAlign:'center'
    }
}