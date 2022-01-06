import React from 'react'
import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux';

const roles = ['CREATOR', 'ADMIN', 'MODERATOR']

const PostMenu = ({data, refetchPosts, handleReport, copiedCB}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [delete_post] = useMutation(DELETE_GP)

    const handlePostDelete = () => {
        try {delete_post({
            variables: {postID: data.postID}
        }).then(()=>refetchPosts())}
        catch{}
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.origin+'/community/post/'+data.postID)
        copiedCB()
    }

    return (
        <>
            <div className='post-options-menu'>
                <ul>
                    <li onClick={copyToClipboard}><FontAwesomeIcon icon='share' /> Share</li>
                    {(data.userID===uid || roles.includes(data.role))&& <li onClick={handlePostDelete}>
                        <FontAwesomeIcon icon='trash-alt' 
                        /> Delete
                    </li>}

                    <li onClick={()=>handleReport(true)}><FontAwesomeIcon icon='flag'/> Report</li>
                </ul>
            </div>
        </>
    )
}

export default PostMenu

const DELETE_GP = gql`
    mutation ($postID: Int!){
        delete_group_post (postID: $postID){
            postID
        }
    }
`