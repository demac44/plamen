import React from 'react'
import UserBox from './UserBox'

import '../General.css'
import UserSuggestionsBox from '../UserSuggestionsBox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const UsersList = ({data, title, closeList}) => {

    return (
        <div className='container-users-list flex-col-ctr'>
            <div className='users-list-box'>
                <div className='users-list-top-bar'>
                    <h3 style={{color:'white'}}>{title}</h3>
                    <FontAwesomeIcon icon='times' onClick={()=>closeList()} style={styles.closeBtn}/>
                </div>
                
                <div>
                    {(data.length === 0) && <p style={styles.emptyList}>Empty</p>}
                    {data.map(user => <UserBox user={user} key={user.userID}/>)}
                </div>
                <span className='user-suggest-cont'>
                    <UserSuggestionsBox/>
                </span>
            </div>
        </div>
    )
}

export default UsersList


const styles = {
    closeBtn:{
        position:'absolute',
        right:'10px',
        top:'7px',
        fontSize:'20px',
        color:'white',
        cursor:'pointer'
    },
    emptyList:{
        width:'100%',
        color:'white',
        textAlign:'center',
        padding:'20px'
    }
}