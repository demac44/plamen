import React, { useState } from 'react'

import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import Comment from './components/Comment'

const PostComments = ({postID}) => {
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
                    limit:10,
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
        <div className='post-comments-box'>
            {data.get_post_comments.map(comment => <Comment refetch={refetch} comment={comment} key={comment.commentID}/>)}
            {data.get_post_comments.length > 0 && 
                <div onClick={seeMore} className='flex-ctr' style={styles.seeMore}><p style={styles.seeMoreBtn}>Load more</p></div>}
        </div>
    )
}

export default PostComments

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
const styles = {
    seeMore:{
        width:'100%',
        color:'white'
    },
    seeMoreBtn:{
        width:'150px',
        textAlign:'center',
        padding:'3px',
        backgroundColor:'#1f1f1f',
        borderRadius:'40px 40px 0 0',
        cursor:'pointer'
    }
}