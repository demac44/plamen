import React from 'react'
import { useSelector } from 'react-redux';
import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'

const PostMenu = ({data, refetchPosts, handleReport, copiedCB}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [delete_post] = useMutation(DELETE_POST)

    const handlePostDelete = () => {
        try {delete_post({
            variables: {postID: data.postID}
        }).then(()=>refetchPosts())}
        catch{}
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.origin+'/post/'+data.postID)
        copiedCB()
    }

    return (
        <>
            <div className='post-options-menu'>
                <ul>
                    <li onClick={copyToClipboard}><i className='fas fa-share' /> Share</li>
                    {data.userID===uid && <li onClick={handlePostDelete}>
                        <i className='fas fa-trash-alt' /> Delete
                    </li>}

                    <li onClick={()=>handleReport(true)}><i className='fas fa-flag' /> Report</li>
                </ul>
            </div>
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