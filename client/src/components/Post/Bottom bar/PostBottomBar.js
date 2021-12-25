import React, { useCallback, useState, memo } from 'react'
import PostComments from './components/PostComments'
import AddComment from './components/AddComment'
import LikePost from './components/LikePost'

import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import LikesList from './components/LikesList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PostBottomBar = ({postID, userID}) => {
    const [likes, setLikes] = useState(false) 
    const {data, loading, error, refetch, fetchMore} = useQuery(GET_COMMENTS, {
        variables:{
            postID,
            limit:1,
            offset:0
        }
    })
    
    const closeLikesList = useCallback(()=>{
        setLikes(false)
    }, [setLikes])

    if(error) throw error
    
    const seeMore = async () => {
        try {
            await fetchMore({
                variables:{
                    limit:5,
                    offset: data?.get_post_comments?.length,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    if(fetchMoreResult?.get_post_comments?.length===0)
                        return Object.assign({}, prev, {
                            get_post_comments: [data.get_post_comments[0]],
                    });
                    return Object.assign({}, prev, {
                        get_post_comments: [...data.get_post_comments, ...fetchMoreResult?.get_post_comments],
                    });
                }
            })
        } catch{}
    }

    return (
        <>
            {!loading &&
            <PostComments 
                postID={postID} 
                comments={data.get_post_comments} 
                refetchComments={refetch} 
                seeMore={seeMore}
            />}
            <div className='post-bottom-bar flex'>
                <LikePost postID={postID} userID={userID}/>
                <p onClick={()=>setLikes(!likes)} style={styles.seeLikes}><FontAwesomeIcon icon='heart' color={likes ? 'darkred': 'white'}/></p>
                <AddComment postID={postID} userID={userID} refetchComments={refetch}/>
            </div>
            {likes && <LikesList postID={postID} closeList={closeLikesList}/>}
        </>
    )
}

export default memo(PostBottomBar)

const styles = {
    seeLikes:{
        padding:'5px 8px',
        fontSize:'12px',
        color:'white',
        border:'1px solid #3f3f3f',
        borderRadius:'10px',
        textAlign:'center',
        cursor:'pointer',
    }
}

const GET_COMMENTS = gql`
    query($postID: Int!, $limit: Int, $offset: Int){
        get_post_comments(postID: $postID, limit: $limit, offset: $offset){
            commentID
            userID
            profile_picture
            username
            date_commented
            comment_text
            postID
        }
    }
`