import React from 'react'
import UserBox from './UserBox'
import '../General.css'
import './style.css'

const UsersList = ({data, title, closeList}) => {

    return (
        <div className='flex-col-ctr overlay' style={{backgroundColor: 'rgba(0, 0, 0,0.7)'}}>
            <div className='users-list-box'>
                <div className='users-list-top-bar'>
                    <h3 style={{color:'white'}}>{title}</h3>
                    <i className='fas fa-times users-list-close-btn' onClick={()=>closeList()}/>
                </div>
                
                <div className='flex-col-ctr'>
                    {(data.length === 0) && <p className='empty-list'>Empty</p>}
                    {data.map(user => <UserBox user={user} key={user.userID}/>)}
                </div>
            </div>
        </div>
    )
}

export default UsersList