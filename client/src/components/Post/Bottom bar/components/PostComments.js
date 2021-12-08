import React from 'react'

import Comment from './Comment'

const PostComments = ({comments, seeMore, refetchComments, groupID}) => {

    return (
        <div className='post-comments-box'>
            {comments.map(comment => <Comment 
                                        comment={comment} 
                                        key={comment.commentID} 
                                        refetchComments={refetchComments}
                                        groupID={groupID}
                                    />)}
            {comments.length > 0 && 
                <div onClick={()=>seeMore()} className='flex-ctr' style={styles.seeMore}><p style={styles.seeMoreBtn}>Load more</p></div>}
        </div>
    )
}

export default PostComments

const styles = {
    seeMore:{
        width:'100%',
        color:'white'
    },
    seeMoreBtn:{
        width:'150px',
        textAlign:'center',
        padding:'2px',
        backgroundColor:'#1f1f1f',
        borderRadius:'40px 40px 0 0',
        cursor:'pointer',
        fontSize:'12px'
    }
}