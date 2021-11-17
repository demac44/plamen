import React, { useCallback, useEffect, useState } from 'react'

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'
import ReportBox from '../../../../UI/ReportBox'

const DELETE_POST = gql`
    mutation delete_post($postID: Int!){
        delete_post(postID: $postID){
            postID
        }
    }
`


const PostOptionsMenu = ({postID, callback, userID, menuCallback}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [delete_post] = useMutation(DELETE_POST)
    const [deleted, setDeleted] = useState(false)
    const [copied, setCopied] = useState(false)
    const [reportMenu, setReportMenu] = useState(false)

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
            menuCallback(false)
        }, 2000)
    }

    const closeReportCallback = useCallback(val => {
        setReportMenu(val)
    }, [setReportMenu])



    return (
        <>
            <div className='fp-options-menu'>
                <ul>
                    <li onClick={copyToClipboard}><i className='fas fa-share'></i> Share</li>
                    {ls.userID===userID && <li onClick={handlePostDelete}>
                        <i className='fas fa-trash-alt'></i> Delete</li>}
                    {ls.userID!==userID && <li onClick={()=>setReportMenu(true)}><i className="fas fa-flag"></i> Report</li>}
                </ul>
            </div>
            {copied && <div style={styles.copied}>Link copied!</div>}
            {reportMenu && <ReportBox postID={postID} userID={userID} callback={closeReportCallback}/>}
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