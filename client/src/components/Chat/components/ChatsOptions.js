import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {gql} from 'graphql-tag'
import {useMutation} from 'react-apollo'

const ChatsOptions = () => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [create_group_chat] = useMutation(CREATE_GROUP_CHAT)

    const handleCreateChat = () => {
        create_group_chat({
            variables:{
                userID: ls.userID
            }
        }).then((res)=>console.log(res))
    }

    return (
        <div className='chats-options flex-h'>
            <span style={styles.newChat} className='flex-ctr' onClick={handleCreateChat}>
                <FontAwesomeIcon icon='plus'/>
            </span>
            <FontAwesomeIcon icon='ellipsis-v' style={styles.opt}/>
        </div>
    )
}

export default ChatsOptions

const styles = {
    newChat:{
        fontSize:'20px',
        color:'white',
        backgroundColor:'#2f2f2f',
        marginRight:'15px',
        width:'40px',
        height:'40px',
        borderRadius:'50%',
        cursor:'pointer'
    },
    opt:{
        fontSize:'25px',
        color:'white',
    }
}

const CREATE_GROUP_CHAT = gql`
    mutation ($userID: Int!){
        create_group_chat (userID: $userID){
            userID
            groupChatId
        }
    }
`