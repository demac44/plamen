import React, { useState, memo } from 'react'
import PostComments from './components/PostComments'
import AddComment from './components/AddComment'
import LikePost from './components/LikePost'



import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import LikesList from './components/LikesList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'

const PostBottomBar = ({postID, userID}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [likes, setLikes] = useState(false) 
    const {data, loading, error, refetch, fetchMore} = useQuery(GET_GP_COMMENTS, {
        variables:{
            postID,
            limit:1,
            offset:0,
            uid
        }
    })
    
    if(error) throw error
    
    const seeMore = async () => {
        try {
            await fetchMore({
                variables:{
                    limit:5,
                    offset: data.get_group_post_comments.length
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                        if(fetchMoreResult?.get_group_post_comments?.length===0)
                            return Object.assign({}, prev, {
                                get_group_post_comments: [data.get_group_post_comments[0]],
                        });
                        return Object.assign({}, prev, {
                            get_group_post_comments: [...data.get_group_post_comments, ...fetchMoreResult?.get_group_post_comments],
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
                comments={data.get_group_post_comments} 
                refetchComments={refetch} 
                seeMore={seeMore}
            />}
            <div className='post-bottom-bar flex'>
                <LikePost postID={postID} userID={userID}/>

                <p onClick={()=>setLikes(!likes)} style={styles.seeLikes}>
                    <FontAwesomeIcon icon='sort-down' color='white' size='lg'
                /></p>
                
                <AddComment postID={postID} userID={userID} refetchComments={refetch}/>
            </div>
            {likes && <LikesList postID={postID}/>}
        </>
    )
}

export default memo(PostBottomBar)

const styles = {
    seeLikes:{
        padding:'0 6px 5px 6px',
        fontSize:'14px',
        border:'1px solid #3f3f3f',
        borderRadius:'2px',
        textAlign:'center',
        cursor:'pointer',
        marginTop:'5px'
    }
}

const GET_GP_COMMENTS = gql`
    query($postID: Int!, $limit: Int, $offset: Int, $uid: Int!){
        get_group_post_comments (postID: $postID, limit: $limit, offset: $offset, userID: $uid){
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