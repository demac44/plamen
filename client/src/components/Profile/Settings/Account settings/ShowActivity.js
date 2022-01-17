import React, { useEffect, useState } from 'react'
import {gql} from 'graphql-tag'
import {useMutation, useQuery} from 'react-apollo'
import {useSelector} from 'react-redux'
import './style.css'

const ShowActivity = () => {
    const usernm = useSelector(state => state?.isAuth?.user?.username)
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [change_status] = useMutation(CHANGE_STATUS)
    const {data} = useQuery(GET_STATUS, {variables:{uid, usernm}})
    const [status, setStatus] = useState()

    useEffect(()=>{
        setStatus(data?.get_user?.show_status)
    }, [data])

    const handleChange = () => {
        change_status({
            variables:{
                uid,
                status: !status
            }
        }).then(()=>{
            setStatus(!status)
        })
    }

    return (
        <div className='box flex-ac'>
            <p>Activity status: </p>

            <div className='switch-box' onClick={handleChange}>
                <p className='on-off-txt'>ON</p>
                <p  className='on-off-txt'>OFF</p>
                <div className='switch' style={{ 
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

const GET_STATUS = gql`
    query ($uid: Int!, $usernm: String!){
        get_user (username: $usernm, userID: $uid){
            show_status
        }
    }
`