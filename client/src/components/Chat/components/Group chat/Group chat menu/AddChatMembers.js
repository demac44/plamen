import React, { useState } from 'react'

import { gql } from 'graphql-tag'
import { useMutation } from 'react-apollo'

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
        else return false
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
        <div style={styles.box} className='flex-col-ctr'>
            <p style={{color:'white', marginTop:'15px'}}>Add users</p>
            <input 
                className='input' 
                style={styles.input} 
                type='text' 
                placeholder='Enter username'
                value={addUserValue}
                onChange={(e)=>{setAddUserValue(e.target.value);setError(null);setAddedMsg(null)}}
            />
            {error && <p style={styles.errorMsg}>{error}</p>}
            {addedMsg && <p style={styles.addedMsg}>{addedMsg}</p>}
            {addUserValue.length>0 && <button 
                                        style={styles.addBtn} 
                                        className='btn'
                                        onClick={handleAddUser}
                                    >ADD</button>}
        </div>
    )
}

export default AddChatMembers


const styles = {
    input:{
        height:'35px',
        marginTop:'5px'
    },
    addBtn:{
        padding:'5px 20px',
        marginTop:'10px',
        width:'100px'
    },
    errorMsg:{
        padding:'5px 20px',
        backgroundColor:'#ff5050',
        color:'white',
        borderRadius:'10px',
        fontSize:'14px',
        marginTop:'5px'
    },
    addedMsg:{
        padding:'5px 20px',
        backgroundColor:'#006b47',
        color:'white',
        borderRadius:'10px',
        fontSize:'14px',
        marginTop:'5px'
    }, 
    box: {
        width:'100%', 
        border:'1px solid #2f2f2f', 
        padding:'0 5px 20px 5px',
        marginTop:'10px',
        borderRadius:'10px'
    }
}

const ADD_USER = gql`
    mutation ($username: String!, $gcId: Int!){
        add_group_chat_user(username:$username, groupChatId: $gcId){
            error
        }
    }
`