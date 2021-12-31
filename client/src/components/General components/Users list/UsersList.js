import React from 'react'
import UserBox from './UserBox'

import '../General.css'
import UserSuggestionsBox from '../UserSuggestionsBox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './style.css'

const UsersList = ({data, title, closeList}) => {

    return (
        <div className='flex-col-ctr overlay' style={{backgroundColor: 'rgba(0, 0, 0,0.7)'}}>
            <div className='users-list-box'>
                <div className='users-list-top-bar'>
                    <h3 style={{color:'white'}}>{title}</h3>
                    <FontAwesomeIcon icon='times' onClick={()=>closeList()} className='users-list-close-btn'/>
                </div>
                
                <div className='flex-ctr'>
                    {(data.length === 0) && <p className='empty-list'>Empty</p>}
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