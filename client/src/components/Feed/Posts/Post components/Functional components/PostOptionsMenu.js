import React, { useEffect, useState } from 'react'

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'
import UserBox from '../../../../UI/Users list/UserBox'

const DELETE_POST = gql`
    mutation delete_post($postID: Int!){
        delete_post(postID: $postID){
            postID
        }
    }
`


const PostOptionsMenu = ({postID, callback, userID}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [delete_post] = useMutation(DELETE_POST)
    const [deleted, setDeleted] = useState(false)
    const [copied, setCopied] = useState(false)

    useEffect(()=>{
        callback(deleted)
    }, [deleted, callback])

    const handlePostDelete = () => {
        try {delete_post({
            variables: {postID: postID}
        })
        setDeleted(true)}
        catch(error){
            console.log(error);
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.origin+'/post/'+postID)
        setCopied(true)
        setTimeout(()=>{
            setCopied(false)
        }, 3000)
    }

    return (
        <>
            <div className='fp-options-menu'>
                <ul>
                    <li onClick={copyToClipboard}><i className='fas fa-share'></i> Share</li>
                    {ls.userID===userID && <li onClick={handlePostDelete}>
                        <i className='fas fa-trash-alt'></i> Delete</li>}
                    <li><i className="fas fa-flag"></i> Report</li>
                </ul>
            </div>
            {copied && <div style={styles.copied}>Link copied!</div>}
        </>
    )
}

export default PostOptionsMenu


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