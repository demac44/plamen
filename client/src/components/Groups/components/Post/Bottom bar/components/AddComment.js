import React from 'react'
import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'


const AddComment = ({postID, userID, refetchComments}) => {
    let comment_text;
    const ls = JSON.parse(localStorage.getItem('user'))
    const [add_comment] = useMutation(ADD_GP_COMMENT) 

    const handleAddComment = (e) => {
        e.preventDefault()
        comment_text = e.target.comment_text.value

        if(comment_text.trim()===''){
            console.log('empty');
        } else{
            add_comment({
                variables:{
                    postID: postID,
                    userID: ls.userID,
                    comment_text: comment_text,
                    rid: userID,
                }
            }).then(()=>{
                refetchComments()
                e.target.comment_text.value=''
            })
        }
    }

    return (
        <form style={styles.form} onSubmit={handleAddComment}>
            <textarea style={styles.input} id='comment_text' name='comment_text' type="text" placeholder="Add comment..."/>
            <button className='post-button btn'>POST</button>
        </form>
    )
}

export default AddComment

const styles = {
    form:{
        display:'flex',
        width:'100%', 
        height:'100%',
        alignItems:'center'
    },
    input:{
        width:'100%',
        height:'100%',
        backgroundColor:'#1b1b1b',
        outline:'none',
        border:'none',
        marginLeft:'5px',
        resize:'none',
        paddingTop:'13px',
        color:'white'
    }
}

const ADD_GP_COMMENT = gql`
    mutation ($postID: Int!, $userID: Int!, $comment_text: String!){
        comment_group_post (postID: $postID, userID: $userID, comment_text: $comment_text){
            postID
        }
    }
`