import React from 'react'
import UserBox from './UserBox'

import '../General.css'

const UsersList = ({data, title, closeList}) => {

    return (
        <div className='container-users-list flex-col-ctr'>
            <div className='users-list-box'>
                <div className='users-list-top-bar'>
                    <h2 style={{color:'white'}}>{title}</h2>
                    <i onClick={()=>closeList()} style={styles.closeBtn} className='fas fa-times'></i>
                </div>
                
                <div>
                    {(data.length === 0) && <p style={styles.emptyList}>Add follow suggestions here!!</p>}
                    {data.map(user => <UserBox user={user} key={user.userID}/>)}
                </div>
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
        fontSize:'30px',
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