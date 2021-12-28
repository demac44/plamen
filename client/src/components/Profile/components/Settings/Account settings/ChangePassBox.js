import React, { useState } from 'react'

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'
import { useSelector } from 'react-redux';

import { validatePassword, confirmPass } from '../../../../Entry/Register/RegisterForm'

const ChangePassBox = ({uid}) => {
    const [errorr, setError] = useState(null)
    const [change_password, {error}] = useMutation(CHANGE_PASSWORD)


    const handleChangePassword = (e) => {
        e.preventDefault()

        const oldPassword = e.target.oldPassword.value
        const newPassword = e.target.newPassword.value
        const confirmPassword = e.target.confirmPassword.value

        if(!validatePassword(newPassword)){
            setError('Password must be between 8 and 30 characters long and should not contain whitespace')
            return
        } else if (!confirmPass(newPassword, confirmPassword)){
            setError('Passwords must match')
            return
        } else {
            change_password({
                variables: {
                    userID: uid,
                    oldPass: oldPassword,
                    newPass: newPassword
                }
            }).then(res => {
                console.log(res);
                if(!res?.data?.change_password?.changed && res?.data?.change_password?.error) {
                    setError(res?.data?.change_password?.error)
                }
            })
        }
    }

    if(error)return error


    return (
        <div className='change-pass-box box'>
            <p style={styles.title}>Change password</p>
            {errorr && <p style={styles.errorMsg}>{errorr}</p>}
            <form className='flex-col-ctr' onSubmit={handleChangePassword}>
                <input 
                    id='oldPassword'
                    type='password' 
                    placeholder='Old password'
                    className='input'
                    onFocus={()=>setError(null)}
                />
                <input 
                    id='newPassword'
                    type='password' 
                    placeholder='New password'
                    className='input'
                    onFocus={()=>setError(null)}
                />
                <input 
                    id='confirmPassword'
                    type='password' 
                    placeholder='Confirm new password'
                    className='input'
                    onFocus={()=>setError(null)}
                />
                <button style={styles.btn} type='submit' className='btn'>CHANGE</button>
            </form>
        </div>
    )
}

export default ChangePassBox


const styles = {
    title:{
        textAlign:'center',
        width:'100%',
        color:'white',
        marginBottom:'15px'
    },
    btn:{
        padding:'5px 20px',
        marginTop:'15px'
    },
    errorMsg:{
        padding:'5px 10px',
        backgroundColor:'#ff5050',
        textAlign:'center',
        color:'white',
        borderRadius:'10px',
        marginBottom:'15px',
        fontSize:'14px',
        transition:'ease .3s'
    }
}

const CHANGE_PASSWORD = gql`
    mutation ($userID: Int!, $oldPass: String!, $newPass: String!){
        change_password(userID: $userID, oldPassword: $oldPass, newPassword: $newPass){
            changed
            error
        }
    }

`