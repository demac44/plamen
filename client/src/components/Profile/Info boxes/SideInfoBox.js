import React, { useEffect, useState, memo } from 'react'
import {Link} from 'react-router-dom'
import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { useSelector } from 'react-redux';


const SideInfoBox = ({myprofile, userID}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [dateJoined, setDateJoined] = useState(null)
    const [birthDate, setBirthDate] = useState(null)
    const [age, setAge] = useState(null)
    const {data, loading} = useQuery(USER_INFO, {
        variables:{
            userID: myprofile ? uid : userID
        }
    })

    
    useEffect(()=>{        
        setBirthDate(calcBirthDate(data?.get_user_info?.bDate))
        setDateJoined(calcDateJoined(data?.get_user_info?.date_joined))
        setAge(calculateAge(data?.get_user_info?.bDate))
        return
    }, [data])

    return (
        <div className='profile-side-info-box box' style={{margin:'0'}}>
           <span className='flex-sb'>
               <h3>User information</h3>
               {myprofile && <Link to='/settings/info' className='side-box-link-btn'>Edit</Link>}
            </span>

            {loading ? <div className='flex-ctr'><div className='small-spinner'></div></div> :

            (
            <>
            {(data?.get_user_info?.country || data?.get_user_info?.city) && 
            <div className='flex-sb'>
                    <span className='flex-ac'>
                        <i className='fas fa-home' style={{color: '#426e57'}}/>
                        <h5>Living in</h5>
                        {(data?.get_user_info?.city && !data?.get_user_info?.country) && <p>{data?.get_user_info?.city}</p>}
                        {(!data?.get_user_info?.city && data?.get_user_info?.country) && <p>{data?.get_user_info?.country}</p>}
                        {(data?.get_user_info?.city && data?.get_user_info?.country) && 
                            <p>{data?.get_user_info?.city+', '+data?.get_user_info?.country}</p>}
                    </span>
            </div>}

           {data?.get_user_info?.job && 
            <div className='flex-sb'>
                    <span className='flex-ac'>
                        <i className='fas fa-briefcase' style={{color: 'brown'}}/>
                        <h5>Job</h5>
                        <p>{data?.get_user_info?.job}</p>
                    </span>
            </div>}


           {data?.get_user_info?.university && 
            <div className='flex-sb'>
                    <span className='flex-ac'>
                        <i className='fas fa-university' style={{color: 'teal'}}/>
                        <h5>University</h5>
                        <p>{data?.get_user_info?.university}</p>
                    </span>
            </div>}

           {data?.get_user_info?.high_school && 
            <div className='flex-sb'>
                    <span className='flex-ac'>
                        <i className='fas fa-school' style={{color: 'green'}}/>
                        <h5>High school</h5>
                        <p>{data?.get_user_info?.high_school}</p>
                    </span>
            </div>}

           {data?.get_user_info?.bDate && 
            <div className='flex-sb'>
                    <span className='flex-ac'>
                        <i className='fas fa-birthday-cake' style={{color: 'orange'}}/>
                        <h5>Birthday</h5>
                        <p style={{marginLeft:'10px'}}>{birthDate}</p>
                        <p style={{fontSize:'12px'}}>{age}yrs</p>
                    </span>
            </div>}

           {data?.get_user_info?.phone_number &&
                <div className='flex-sb'>
                    <span className='flex-ac'>
                        <i className='fas fa-mobile-alt' style={{color: 'silver'}}/>
                        <h5>Phone</h5>
                        <p style={{marginLeft:'10px'}}>{data?.get_user_info?.phone_number}</p>
                    </span>
                </div>}

           <br/>

           {data?.get_user_info?.date_joined && <span className='flex-ctr'><p>Joined in {dateJoined}</p></span>}
           </>)}
        </div>
    )
}

export default memo(SideInfoBox)

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