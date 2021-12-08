import React from 'react'
import PostComments from './components/PostComments'
import AddComment from './components/AddComment'
import LikePost from './components/LikePost'


import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'

const PostBottomBar = ({postID, userID}) => {
    const {data, loading, error, refetch, fetchMore} = useQuery(GET_COMMENTS, {
        variables:{
            postID,
            limit:1,
            offset:0
        }
    })

    if(loading) return <p>loading</p>
    if(error) throw error

    
    const seeMore = async () => {
        try {
            await fetchMore({
                variables:{
                    limit:5,
                    offset:data.get_post_comments.length,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    if(fetchMoreResult.get_post_comments.length===0)
                        return Object.assign({}, prev, {
                            get_post_comments: [data.get_post_comments[0]],
                        });
                    return Object.assign({}, prev, {
                      get_post_comments: [...data.get_post_comments, ...fetchMoreResult?.get_post_comments]
                    });
                  }
            })
        } catch{}
    }

    return (
        <>
        <PostComments postID={postID} comments={data.get_post_comments} refetchComments={refetch} seeMore={seeMore}/>
        <div className='post-bottom-bar flex'>
            <LikePost postID={postID} userID={userID}/>
            <p style={styles.seeLikes}>See likes</p>
            <AddComment postID={postID} userID={userID} refetchComments={refetch}/>
        </div>
        </>
    )
}

export default PostBottomBar

const styles = {
    seeLikes:{
        padding:'5px',
        fontSize:'12px',
        minWidth:'60px',
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