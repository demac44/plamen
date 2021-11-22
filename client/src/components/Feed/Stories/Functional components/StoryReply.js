import React from 'react'

import {gql} from 'graphql-tag'
import {useMutation} from 'react-apollo'

const REPLY_TO_STORY = gql`
    mutation ($chatID: Int!, $userID: Int!, $msg_text: String!, $url: String, $type: String!){
        send_message (chatID: $chatID, userID: $userID, msg_text: $msg_text, url: $url, type: $type){
            msgID
        }
    }
`


const StoryReply = ({userID}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [reply] = useMutation(REPLY_TO_STORY)

    // const handleReply = () => {
    //     reply({
    //         variables: {

    //         }
    //     })
    // }

    return (
        <form className='story-bottom-wrap'>
            <input type='text' style={styles.msgInput} disabled={userID===ls.userID} placeholder='Reply to story...'/>
            <button className='btn' disabled={userID===ls.userID} style={styles.btn}>SEND</button>
        </form>
    )
}

export default StoryReply

const styles = {
    msgInput:{
        width:'100%',
        height:'100%',
        backgroundColor:'black',
        color:'white',
        border:'none',
        outline:'none'
    },
    btn:{
        padding:'5px 10px'
    }
}
