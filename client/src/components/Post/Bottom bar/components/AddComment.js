import React, { useCallback, useState } from 'react'
import {gql} from 'graphql-tag'
import { useSelector } from 'react-redux';
import { useMutation } from 'react-apollo'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import EmojisBox from '../../../General components/Emojis/EmojisBox';

const AddComment = ({postID, userID, refetchComments}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const usernm= useSelector(state => state?.isAuth?.user?.username)
    const ls = JSON.parse(localStorage.getItem('user'))
    const [add_comment] = useMutation(ADD_COMMENT) 
    const [text, setText] = useState('')
    const [emojis, setEmojis] = useState(false)
    const [mention_notif] = useMutation(MENTION_NOTIF)

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
                findTag(text).forEach(tag=>{
                    mention_notif({
                        variables:{
                            userID: uid,
                            postID: postID,
                            username: usernm,
                            pfp: ls.profile_picture || '',
                            rusername: tag
                        }
                    })
                })
            })
            .then(()=>{
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

const ADD_COMMENT = gql`
    mutation ($postID: Int!, $userID: Int!, $comment_text: String!, $rid: Int!){
        add_comment(postID: $postID, userID: $userID, comment_text: $comment_text){
            commentID
        }
        comment_notification (postID: $postID, sender_id: $userID, receiver_id: $rid){
            postID
        }
    }
`

const MENTION_NOTIF = gql`
    mutation ($postID: Int!, 
              $userID: Int!, 
              $username: String!, 
              $rusername: String!,
              $pfp: String!){
        cmt_mention_notification (postID: $postID, 
                              sender_id: $userID, 
                              username: $username, 
                              receiver_username: $rusername
                              profile_picture: $pfp){
            postID
        }
    }
`
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

const findTag = (post_text) => {
    let arr = post_text.split('')
    let namesArr = [];
    let name=null;
    for(let i = 0;i<arr.length;i++){
        name=null;
        if(arr[i]==='@'){
            for(let j=i;j<arr.length;j++){
                if(arr[j]===' ') {name=post_text.slice(i+1,j); break}
                else if(j===arr.length-1) {name=post_text.slice(i+1,j+1); break}
                else if(j===arr.length) {name=post_text.slice(i+1,-1); break}
            }
            name && namesArr.push(name)
        }
    }
    return namesArr.filter(onlyUnique)
}