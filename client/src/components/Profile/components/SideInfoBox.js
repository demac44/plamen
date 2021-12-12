import React from 'react'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'

const SideInfoBox = ({myprofile}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const {data, loading} = useQuery(USER_INFO, {
        variables:{
            userID: ls.userID
        }
    })

    if(loading) return <p>loading</p>

    return (
        <div className='profile-side-info-box'>
           <span className='flex-sb' style={styles.title}>
               <h3>User information</h3>
               {myprofile && <p style={styles.editBtn}>Edit</p>}
            </span>

           {data?.get_user_info?.job && 
            <div className='flex-sb'>
                    <span className='flex-h'>
                        <i style={{color:'brown'}} className="fas fa-briefcase"></i> 
                        <h5>Works at</h5>
                        <p>{data?.get_user_info?.job}</p>
                    </span>
            </div>}

           {data?.get_user_info?.university && 
            <div className='flex-sb'>
                    <span className='flex-h'>
                        <i style={{color:'teal'}} className="fas fa-university"></i> 
                        <h5>University</h5>
                        <p>{data?.get_user_info?.university}</p>
                    </span>
            </div>}

           {data?.get_user_info?.high_school && 
            <div className='flex-sb'>
                    <span className='flex-h'>
                        <i style={{fontSize:'14px', color:'green'}} className="fas fa-school"></i>
                        <h5>High school</h5>
                        <p>{data?.get_user_info?.high_school}</p>
                    </span>
            </div>}

           {data?.get_user_info?.bDate && 
            <div className='flex-sb'>
                    <span className='flex-h'>
                        <i style={{color:'orange'}} className="fas fa-birthday-cake"></i>
                        <h5>Birthday</h5>
                        <p style={{marginLeft:'10px'}}>{data?.get_user_info?.bDate}</p>
                        <p style={{fontSize:'12px'}}>21yrs</p>
                    </span>
            </div>}

           {data?.get_user_info?.phone_number &&
                <div className='flex-sb'>
                    <span className='flex-h'>
                        <i style={{color:'silver'}} className="fas fa-mobile-alt"></i>
                        <h5>Phone</h5>
                        <p style={{marginLeft:'10px'}}>{data?.get_user_info?.phone_number}</p>
                    </span>
                </div>}

           <br/>

           {data?.get_user_info?.date_joined && <span style={styles.joined}><p>Joined in {'sada'}</p></span>}
        </div>
    )
}

export default SideInfoBox


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
        cursor:'pointer'
    }
}


const USER_INFO = gql`
    query ($userID: Int!){
        get_user_info (userID: $userID){
            job
            university
            high_school
            bDate
            phone_number
            date_joined
        }
    }
`