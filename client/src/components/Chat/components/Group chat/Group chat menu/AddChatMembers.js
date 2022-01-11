import React, { useState } from 'react'
import { gql } from 'graphql-tag'
import { useMutation } from 'react-apollo'
import './style.css'

const AddChatMembers = ({data, chatID, refetch}) => {
    const [addedMsg, setAddedMsg] = useState(null)
    const [error, setError] = useState(null)
    const [addUserValue, setAddUserValue] = useState('')
    const [add_user] = useMutation(ADD_USER)

    const checkIfMember = (username) => {
        const userFound = data?.get_group_chat_members?.filter(user=>{
            return user.username===username
        })
        if(userFound.length>0) return true
        return false
    }

    const handleAddUser = () => {
        setAddedMsg(null)
        setError(null)

        if(checkIfMember(addUserValue)){
            return setError('User is already a member!')
        } else {
            add_user({
                variables:{
                    gcId: chatID,
                    username: addUserValue
                }
            }).then(res=>{
                console.log(res.data.add_group_chat_user.error);
                if(res?.data?.add_group_chat_user?.error) {
                    setError(res?.data?.add_group_chat_user?.error)
                    setAddedMsg(null)
                    return 
                } else {
                    setError(null)
                    setAddedMsg('User added!')
                    setAddUserValue('')
                    refetch()
                    return 
                }
            })
        }
    }


    return (
        <div className='flex-col-ctr gc-menu-add-user box'>
            <p style={{color:'white', marginTop:'15px'}}>Add users</p>
            
            <input 
                className='input gc-addu-input' 
                type='text' 
                placeholder='Enter username'
                value={addUserValue}
                onChange={(e)=>{setAddUserValue(e.target.value);setError(null);setAddedMsg(null)}}
            />
            {error && <p className='gc-menu-err-msg'>{error}</p>}

            {addedMsg && <p className='gc-menu-added-msg'>{addedMsg}</p>}

            {addUserValue.length>0 && <button 
                                        className='btn gc-menu-addu-btn'
                                        onClick={handleAddUser}
                                    >ADD</button>}
        </div>
    )
}

export default AddChatMembers

const ADD_USER = gql`
    mutation ($username: String!, $gcId: Int!){
        add_group_chat_user(username:$username, groupChatId: $gcId){
            error
        }
    }
`