import React, {useState} from 'react'
import { validateNames, validateUsername } from '../../../../Entry/Register/RegisterForm'
import ErrorMsg from '../../../../Entry/ErrorMsg'

import { useSelector } from 'react-redux';
import {gql} from 'graphql-tag'
import {useMutation} from 'react-apollo'
import Avatar from '../../../../General components/Avatar'
import { Link } from 'react-router-dom'
import ShowActivity from './ShowActivity'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const EDIT_INFO = gql`
    mutation ($userID: Int!, $fname: String, $lname: String, $username: String){
        edit_info(userID: $userID, first_name: $fname, last_name: $lname, username: $username){
            userID
        }
    }
`


const EditForm = ({handleMenu, uid}) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const usernm = useSelector(state => state?.isAuth?.user?.username)
    const [errorMsg, setErrorMsg] = useState('')
    const [edit_info] = useMutation(EDIT_INFO)

    const handleEdit = (e) => {
        e.preventDefault()

        let fname = e.target.first_name.value.charAt(0).toUpperCase() + e.target.first_name.value.slice(1);
        let lname = e.target.last_name.value.charAt(0).toUpperCase() + e.target.last_name.value.slice(1);
        let username = e.target.username.value
        
        let empty = false
        let arr = [username, fname, lname]

        arr.forEach(field => {
            let trimmed = field.trim()
            if (trimmed === '') {
                empty = true
                return
            }
        })
        
        if (empty){
            setErrorMsg('Please fill in all fields')
        } else if (validateNames(fname, lname)){
            setErrorMsg('First name and last name can contain only letters, not numbers, whitespace or any other special characters and cannot be longer than 20 characters!')
        } else if (!validateUsername(username)){
            setErrorMsg('Username must contains only lowercase letters, numbers, underscores and dots and cannot be longer than 30 characters')
        } else {
            try {
                edit_info({
                    variables: {
                        userID: uid,
                        fname,
                        lname,
                        username,
                    }
                }).then(res => {
                    res?.data.error ? setErrorMsg(res.data.error) : window.location.reload()
                    localStorage.setItem('user', JSON.stringify({...user, 
                                                    first_name: fname,
                                                    last_name: lname,
                                                    username: username}))
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            {errorMsg !== '' && <ErrorMsg message={errorMsg}/>}

            <div className='box flex-ctr'>
                <Link to='/settings'>
                    <FontAwesomeIcon icon='arrow-left' className='settings-arrow-back'/>
                </Link>
                <h3>
                    Account settings
                </h3>
            </div>

            <ShowActivity/>

            <span className='flex-col-ctr box'>
                <p style={styles.title}>Change profile picture</p>
                <span className='flex-ctr'>
                    <Avatar size='70px' image={user.profile_picture}/>
                    <p onClick={()=>handleMenu(true)} style={styles.pfpBtn}>Change</p>
                </span>
            </span>

            <form className='entry-form flex-col-ctr box' onSubmit={handleEdit}>
                <p style={styles.title}>Change name and username</p>
                <div className="reg-names-box">
                    <input 
                        type="text" 
                        id='first_name' 
                        name='first_name' 
                        placeholder="Change first name" 
                        defaultValue={user.first_name}
                    />
                    <input 
                        type="text" 
                        id='last_name' 
                        name='last_name' 
                        placeholder="Change last name" 
                        defaultValue={user.last_name}
                    />
                </div>
                <input 
                    type="text" 
                    id='username' 
                    name='username' 
                    placeholder="Change username" 
                    defaultValue={usernm}
                />
                <button style={{marginTop:'15px', alignSelf:'flex-end'}} className="post-button btn" type="submit">SAVE</button>
            </form>
        </>
    )
}

export default EditForm


const styles = {
    pfpBtn:{
        padding:'5px 20px',
        marginLeft:'15px',
        color:'#aaa',
        border:'1px solid #2f2f2f',
        borderRadius:'10px',
        cursor:'pointer'
    },
    title:{
        color:'white',
        paddingBottom:'20px'
    }
}