import React, {useState} from 'react'
import UserBox from '../../../../General components/Users list/UserBox'
import { gql } from 'graphql-tag'
import { useMutation } from 'react-apollo'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const ChatMembersBox = ({data, admin, refetch, chatID, adminMember}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [remove_member] = useMutation(REMOVE_MEMBER)

    const handleRemoveMember = () => {
        if(ls.userID===admin){

            remove_member({
                variables:{
                    gcId: chatID,
                    userID: ls.userID
                }
            }).then(()=>refetch())
        }
    }

    return (
        <span style={styles.membersBox} className='flex-col-ctr'>
            <p style={{marginBottom:'5px'}}>Chat members</p>
            {adminMember.userID && <span style={{width:'100%'}} className='flex-h'>
                <UserBox user={adminMember}/>
                <p style={styles.adminTag}>ADMIN</p>
            </span>}
            {data?.get_group_chat_members?.map(member => (
                member.userID!==admin &&
                <div className='flex-h' style={styles.userBox} key={member.userID}>
                    <UserBox user={member}/>
                    {(ls.userID===admin) && 
                        <FontAwesomeIcon 
                            icon='times' 
                            style={styles.removeBtn}
                            onClick={handleRemoveMember}
                    />}
                </div>
            ))}
        </span>
    )
}

export default ChatMembersBox


const styles = {
    membersBox:{
        color:'white',
        width:'100%',
        paddingTop:'5px',
        border:'1px solid #2f2f2f', 
        borderRadius:'10px'
    },
    userBox:{
        width:'100%',
    },
    removeBtn:{
        fontSize:'20px',
        color:'white',
        margin:'0 10px',
        cursor:'pointer'
    },
    adminTag:{
        margin:'0 10px',
        backgroundColor:'purple',
        padding:'3px 6px',
        borderRadius:'20px',
        fontSize:'12px'
    }
}

const REMOVE_MEMBER = gql`
    mutation ($userID: Int!, $gcId: Int!){
        remove_group_chat_member(userID: $userID, groupChatId: $gcId){
            userID
        }
    }
`