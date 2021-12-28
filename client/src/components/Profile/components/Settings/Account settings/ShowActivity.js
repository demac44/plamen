import React, { useState } from 'react'

import {gql} from 'graphql-tag'
import {useMutation} from 'react-apollo'
import {useSelector} from 'react-redux'

const ShowActivity = () => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const user = JSON.parse(localStorage.getItem('user'))
    const [change_status] = useMutation(CHANGE_STATUS)
    const [status, setStatus] = useState(user?.status)

    const handleChange = () => {
        change_status({
            variables:{
                uid,
                status: !status
            }
        }).then(()=>{
            localStorage.setItem('user', JSON.stringify({...user, status: !status}))
            setStatus(!status)
        })
    }

    return (
        <div style={{color:'#aaa'}} className='box flex-h'>
            <p>Activity status: </p>

            <div style={styles.switchBox} onClick={handleChange}>
                <p style={{...styles.locks, left:'6px'}}>ON</p>
                <p style={{...styles.locks, right:'5px'}}>OFF</p>
                <div style={{...styles.switch, 
                            left: status ? '32px' : '0',
                            backgroundColor: status ? '#00752d' : '#861b1b'
                }}></div>
            </div>

        </div>
    )
}

export default ShowActivity

const CHANGE_STATUS = gql`
    mutation ($uid: Int!, $status: Boolean!){
        change_activity_status(userID: $uid, show_status: $status){
            show_status
        }
    }
`

const styles = {
    switchBox:{
        position:'relative',
        width:'60px',
        height:'25px',
        borderRadius:'20px',
        border:'1px solid #2f2f2f',
        cursor:'pointer',
        marginLeft:'20px'
    },
    switch:{
        position:'absolute',
        top:'0',
        width:'25px',
        height:'100%',
        backgroundColor:'white',
        borderRadius:'50%',
        border:'2px solid #2f2f2f',
        transition:'ease .3s'
    },
    locks:{
        position:'absolute',
        top:'4px',
        color:'#4f4f4f',
        fontSize:'12px'
    }
}