import React, { useEffect, useState, memo } from 'react'
import {Link} from 'react-router-dom'
import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


const SideInfoBox = ({myprofile, userID}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [dateJoined, setDateJoined] = useState(null)
    const [birthDate, setBirthDate] = useState(null)
    const [age, setAge] = useState(null)
    const {data} = useQuery(USER_INFO, {
        variables:{
            userID: myprofile ? ls.userID : userID
        }
    })

    
    useEffect(()=>{        
        setBirthDate(calcBirthDate(data?.get_user_info?.bDate))
        setDateJoined(calcDateJoined(data?.get_user_info?.date_joined))
        setAge(calculateAge(data?.get_user_info?.bDate))
        return
    }, [data])

    return (
        <div className='profile-side-info-box'>
           <span className='flex-sb' style={styles.title}>
               <h3>User information</h3>
               {myprofile && <Link to='/settings/info' style={styles.editBtn}>Edit</Link>}
            </span>

            {(data?.get_user_info?.country || data?.get_user_info?.city) && 
            <div className='flex-sb'>
                    <span className='flex-h'>
                        <FontAwesomeIcon icon='home' color='#426e57' fixedWidth/>
                        <h5>Living in</h5>
                        {(data?.get_user_info?.city && !data?.get_user_info?.country) && <p>{data?.get_user_info?.city}</p>}
                        {(!data?.get_user_info?.city && data?.get_user_info?.country) && <p>{data?.get_user_info?.country}</p>}
                        {(data?.get_user_info?.city && data?.get_user_info?.country) && 
                            <p>{data?.get_user_info?.city+', '+data?.get_user_info?.country}</p>}
                    </span>
            </div>}

           {data?.get_user_info?.job && 
            <div className='flex-sb'>
                    <span className='flex-h'>
                        <FontAwesomeIcon icon='briefcase' color='brown' fixedWidth/>
                        <h5>Works at</h5>
                        <p>{data?.get_user_info?.job}</p>
                    </span>
            </div>}


           {data?.get_user_info?.university && 
            <div className='flex-sb'>
                    <span className='flex-h'>
                        <FontAwesomeIcon icon='university' color='teal' fixedWidth/>
                        <h5>University</h5>
                        <p>{data?.get_user_info?.university}</p>
                    </span>
            </div>}

           {data?.get_user_info?.high_school && 
            <div className='flex-sb'>
                    <span className='flex-h'>
                        <FontAwesomeIcon icon='school' color='green' fixedWidth/>
                        <h5>High school</h5>
                        <p>{data?.get_user_info?.high_school}</p>
                    </span>
            </div>}

           {data?.get_user_info?.bDate && 
            <div className='flex-sb'>
                    <span className='flex-h'>
                        <FontAwesomeIcon icon='birthday-cake' color='orange' fixedWidth/>
                        <h5>Birthday</h5>
                        <p style={{marginLeft:'10px'}}>{birthDate}</p>
                        <p style={{fontSize:'12px'}}>{age}yrs</p>
                    </span>
            </div>}

           {data?.get_user_info?.phone_number &&
                <div className='flex-sb'>
                    <span className='flex-h'>
                        <FontAwesomeIcon icon='mobile-alt' color='silver' fixedWidth/>
                        <h5>Phone</h5>
                        <p style={{marginLeft:'10px'}}>{data?.get_user_info?.phone_number}</p>
                    </span>
                </div>}

           <br/>

           {data?.get_user_info?.date_joined && <span style={styles.joined}><p>Joined in {dateJoined}</p></span>}
        </div>
    )
}

export default memo(SideInfoBox)


const styles = {
    title:{
        padding:'5px'
    },
    joined:{
        width:'100%',
        textAlign:'center'
    },
    editBtn:{
        padding:'5px 15px',
        backgroundColor:'#2f2f2f',
        borderRadius:'10px',
        fontSize:'14px',
        cursor:'pointer',
        color:'white'
    }
}


const USER_INFO = gql`
    query ($userID: Int){
        get_user_info (userID: $userID){
            job
            university
            high_school
            bDate
            phone_number
            date_joined
            country
            city
        }
    }
`

const calculateAge = (timestamp) => {
    return Math.floor((Date.now() - timestamp) / (31557600000))
}

const calcDateJoined = (timestamp) => {
    let date = new Date(parseInt(timestamp))
    const m = date.toLocaleString('default', { month: 'short' });
    const y = date.getFullYear()
    return m+' '+y
}

const calcBirthDate = (timestamp) => {
    let bdate = new Date(parseInt(timestamp)).toDateString()
    return bdate
}