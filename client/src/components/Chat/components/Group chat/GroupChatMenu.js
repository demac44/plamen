import React, { useCallback, useState, memo } from 'react'
import { gql } from 'graphql-tag'
import { useMutation, useQuery } from 'react-apollo'
import AllChatMedia from '../AllChatMedia'
import UserBox from '../../../General components/Users list/UserBox'

 
const GroupChatMenu = ({chatID, admin}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [chatMedia, setChatMedia] = useState(false)
    const [delete_chat] = useMutation(DELETE_CHAT)
    const [leave_chat_member] = useMutation(LEAVE_CHAT_MEMBER)
    const [leave_chat_admin] = useMutation(LEAVE_CHAT_ADMIN)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [confirmLeave, setConfirmLeave] = useState(false)
    const {data, loading} = useQuery(GET_MEMBERS, {
        variables:{
            gcId: chatID,
            limit:10,
            offset:0,
            userID: ls.userID
        }
    })


    const closeAllMediaCallback = useCallback(()=>{
        setChatMedia(false)
    }, [setChatMedia])
 
    const handleChatDelete = () => {
        if(ls.userID===admin)
            delete_chat({
                variables:{
                    gcId: chatID
                }
            }).then(()=>window.location.href='/chats')
    }

    const handleChatLeave = () => {
        if(!loading && data?.get_group_chat_members?.length<=1){
            handleChatDelete()
        } else {
            if (ls.userID===admin){
                leave_chat_admin({
                    variables:{
                        gcId: chatID,
                        userID: ls.userID
                    }
                }).then(()=>window.location.href = '/chats')
            } else {
                leave_chat_member({
                    variables:{
                        gcId: chatID,
                        userID: ls.userID
                    }
                }).then(()=>window.location.href = '/chats')
            }
        }
    }

    return (
        <>
            <div className='chat-menu'>
                <ul>
                    <span style={styles.membersBox} className='flex-col-ctr'>
                        <p>Chat members</p>
                        {!loading && data?.get_group_chat_members?.map(member => <UserBox user={member} key={member.userID}/>)}
                    </span>

                    <li onClick={()=>setChatMedia(true)} style={{marginTop:'15px'}}>See chat media</li>

                    <li
                        style={{color:'#940a00'}}
                        onClick={()=>setConfirmLeave(!confirmLeave)}
                    >LEAVE GROUP
                    </li>

                    {confirmLeave && <div style={styles.confirmBox} className='flex-col-ctr'>
                        <p style={{color:'white'}}>Are you sure you want to leave this chat?</p>
                        <span className='flex-ctr' style={styles.btnsBox}>
                            <button style={styles.btns} className='btn' onClick={handleChatLeave}>CONFIRM</button>
                            <button style={styles.btns} className='btn' onClick={()=>setConfirmLeave(false)}>EXIT</button>
                        </span>
                    </div>}

                    {ls.userID===admin && 
                        <li style={{color:'#940a00'}} onClick={()=>setConfirmDelete(!confirmDelete)}>
                            <p>DELETE CHAT</p>
                        </li>}

                    {confirmDelete && <div style={styles.confirmBox} className='flex-col-ctr'>
                        <p style={{color:'white'}}>Are you sure you want to delete this chat?</p>
                        <span className='flex-ctr' style={styles.btnsBox}>
                            <button style={styles.btns} className='btn' onClick={handleChatDelete}>CONFIRM</button>
                            <button style={styles.btns} className='btn' onClick={()=>setConfirmDelete(false)}>EXIT</button>
                        </span>
                    </div>}

                </ul>
            </div>
            {chatMedia && <AllChatMedia chatID={chatID} closeAllMediaCallback={closeAllMediaCallback}/>}
        </>
    )
}

export default memo(GroupChatMenu)

const styles = {
    confirmBox:{
        marginTop:'15px',
        padding:'10px',
        textAlign:'center'
    },
    btnsBox:{
        marginTop:'10px'
    },
    btns:{
        margin:'5px 10px',
        padding:'5px 10px'
    },
    membersBox:{
        color:'white'
    }
}

const GET_MEMBERS = gql`
    query ($gcId: Int!, $limit: Int!, $offset: Int!){
        get_group_chat_members (groupChatId: $gcId, limit: $limit, offset: $offset){
            first_name
            last_name
            username
            userID
        }
    }
`
const DELETE_CHAT = gql`
    mutation ($gcId:Int!){
        delete_group_chat(groupChatId: $gcId){
            groupChatId
        }
    }
`

const LEAVE_CHAT_MEMBER = gql`
    mutation ($userID: Int!, $gcId: Int!){
        leave_group_chat_member(userID: $userID, groupChatId: $gcId){
            groupChatId
        }
    }
`

const LEAVE_CHAT_ADMIN = gql`
    mutation($userID: Int!, $gcId: Int!){
        leave_group_chat_admin(userID: $userID, groupChatId: $gcId){
            groupChatId
        }
    }
`