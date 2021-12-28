import React from 'react'
import { useSelector } from 'react-redux';
import UserBox from '../../../../General components/Users list/UserBox'
import { gql } from 'graphql-tag'
import { useMutation } from 'react-apollo'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const ChatMembersBox = ({data, admin, refetch, chatID, adminMember}) => {
    const uid = useSelector(state => state.isAuth.user?.userID)
    const [remove_member] = useMutation(REMOVE_MEMBER)

    const handleRemoveMember = (userID) => {
        if(uid===admin){
            remove_member({
                variables:{
                    gcId: chatID,
                    userID: uid
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
                    {(uid===admin) && 
                        <FontAwesomeIcon 
                            icon='times' 
                            style={styles.removeBtn}
                            onClick={()=>handleRemoveMember(member.userID)}
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
        borderRadius:'10px',
        maxHeight:'50vh',
        overflow:'auto',
        backgroundColor: '#1b1b1b'

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