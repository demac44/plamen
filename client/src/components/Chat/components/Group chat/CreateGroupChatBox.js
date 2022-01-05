import React from 'react'
import {gql} from 'graphql-tag'
import {useMutation} from 'react-apollo'
import { useSelector } from 'react-redux';

const CreateGroupChatBox = () => {
    const uid = useSelector(state => state.isAuth.user?.userID)
    const [create_group_chat] = useMutation(CREATE_GROUP_CHAT)


    const handleCreateChat = (e) => {
        e.preventDefault()

        const groupname = e.target.groupname.value

        create_group_chat({
            variables:{
                userID: uid,
                name:groupname
            }
        }).then(res=>{
            window.location.href = '/chat/group/'+res?.data?.create_group_chat?.groupChatId
        })
    }

    return (
        <form className='create-group-chat-box' onSubmit={handleCreateChat}>
            <input type='text' id='groupname' placeholder='Group name'/>
            <button type='submit' className='btn'>CREATE</button>
        </form>
    )
}

export default CreateGroupChatBox

const CREATE_GROUP_CHAT = gql`
    mutation ($userID: Int!, $name: String!){
        create_group_chat (userID: $userID, name: $name){
            userID
            groupChatId
        }
    }
`
