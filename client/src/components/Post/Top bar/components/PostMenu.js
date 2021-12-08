import React, { useCallback, useEffect, useState } from 'react'

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'
import ReportBox from './ReportBox'


const PostMenu = ({data, refetchPosts}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [delete_post] = useMutation(data.groupID ? DELETE_GP : DELETE_POST)
    const [copied, setCopied] = useState(false)
    const [reportMenu, setReportMenu] = useState(false)


    const handlePostDelete = () => {
        try {delete_post({
            variables: {postID: data.postID}
        }).then(()=>refetchPosts())}
        catch{}
    }

    const copyToClipboard = () => {
        if(data?.groupID) navigator.clipboard.writeText(window.location.origin+'/community/post/'+data.postID)
        else navigator.clipboard.writeText(window.location.origin+'/post/'+data.postID)
        setCopied(true)
        setTimeout(()=>{
            setCopied(false)
        }, 2000)
    }

    const closeReportCallback = useCallback(() => {
        setReportMenu(false)
    }, [setReportMenu])

    return (
        <>
            <div className='post-options-menu'>
                <ul>
                    <li onClick={copyToClipboard}><i className='fas fa-share'></i> Share</li>
                    {data.userID===ls.userID && <li onClick={handlePostDelete}>
                        <i 
                            className='fas fa-trash-alt'
                        ></i> Delete
                    </li>}

                    <li onClick={()=>setReportMenu(true)}><i className="fas fa-flag"></i> Report</li>
                </ul>
            </div>
            {copied && <div style={styles.copied}>Link copied!</div>}
            {reportMenu && <ReportBox data={data} closeReportCallback={closeReportCallback}/>}
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
const DELETE_GP = gql`
    mutation ($postID: Int!){
        delete_group_post (postID: $postID){
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