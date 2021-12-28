import React, { useState } from 'react'

import { useSelector } from 'react-redux';
import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'



const PostMenu = ({data, refetchPosts, handleReport}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [delete_post] = useMutation(DELETE_POST)
    const [copied, setCopied] = useState(false)

    const handlePostDelete = () => {
        try {delete_post({
            variables: {postID: data.postID}
        }).then(()=>refetchPosts())}
        catch{}
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.origin+'/post/'+data.postID)
        setCopied(true)
        setTimeout(()=>{
            setCopied(false)
        }, 2000)
    }

    return (
        <>
            <div className='post-options-menu'>
                <ul>
                    <li onClick={copyToClipboard}><FontAwesomeIcon icon='share' /> Share</li>
                    {data.userID===uid && <li onClick={handlePostDelete}>
                        <FontAwesomeIcon icon='trash-alt' /> Delete
                    </li>}

                    <li onClick={()=>handleReport(true)}><FontAwesomeIcon icon='flag' /> Report</li>
                </ul>
            </div>
            {copied && <div style={styles.copied}>Link copied!</div>}
        </>
    )
}

export default PostMenu


const DELETE_POST = gql`
    mutation delete_post($postID: Int!){
        delete_post(postID: $postID){
            postID
        }
    }
`

const styles = {
    copied:{
        position:'fixed',
        bottom:'30px',
        left:'50%',
        transform:'translateX(-50%)',
        width:'200px',
        padding:'10px',
        backgroundColor:'#1f1f1f',
        color:'white',
        zIndex:'100000000000000000000000000000000',
        textAlign:'center',
        borderRadius:'10px'
    }
}