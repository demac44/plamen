import React, { useCallback, useState } from 'react'
import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'
import { useSelector } from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import EmojisBox from '../../../../../General components/Emojis/EmojisBox';

const AddComment = ({postID, userID, refetchComments}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [add_comment] = useMutation(ADD_GP_COMMENT) 
    const [text, setText] = useState('')
    const [emojis, setEmojis] = useState(false)

    const handleAddComment = () => {

        if(text.trim()===''){
            return
        } else{
            add_comment({
                variables:{
                    postID: postID,
                    userID: uid,
                    comment_text: text,
                    rid: userID,
                }
            }).then(()=>{
                refetchComments()
                setText('')
            })
        }
    }

    const emojiCB = useCallback(val => {
        setText(text+val)
    }, [text])

    return (
        <div className='flex-col wh-100'>
            <span className='flex-ctr'>
                <FontAwesomeIcon icon='icons' color='white' size='lg' fixedWidth className='cmt-emojis-btn' onClick={()=>setEmojis(!emojis)}/>
                <textarea 
                    className='add-cmt-textarea wh-100 input' 
                    type="text" 
                    placeholder="Add comment..."
                    value={text}
                    onChange={(e)=>setText(e.target.value)}
                    />
                <button className='post-button btn' onClick={handleAddComment}>POST</button>
            </span>
            {emojis && <EmojisBox emojiCB={emojiCB} visible={true}/>}
        </div>
    )
}

export default AddComment

const ADD_GP_COMMENT = gql`
    mutation ($postID: Int!, $userID: Int!, $comment_text: String!){
        comment_group_post (postID: $postID, userID: $userID, comment_text: $comment_text){
            postID
        }
    }
`