import React, {useState, useEffect, memo} from 'react'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const InfoBox = ({data, user, membersCount}) => {
    const [dateCreated, setDateCreated] = useState('')

    useEffect(()=>{
        let date = parseInt(data.date_created)
        date = new Date(date).toDateString()
        setDateCreated(date)
    }, [data])

    return (
        <>
            <div className='info-box'>
                <div className='flex-ctr'><h3>Information</h3></div>
                <div className='flex-sb' style={{padding:'5px', color:'white'}}>
                    <p>{membersCount} members</p>
                    <Link to={'/community/'+data.groupID+'/members'} className='btn side-box-link-btn'>See all</Link>
                </div>
                <p style={{padding:'5px'}}>Created on {dateCreated}</p>
            </div>

            <div className='info-box flex-col-ctr'>
                <div><h3>Description</h3></div>
                {data?.group_description ? 
                <div className='info-box-text'>{data?.group_description}</div>
                    :  
                    ((user && (user?.role==='CREATOR' || user?.role==='ADMIN')) &&
                    <div className='flex-ctr info-box-add-btn'>
                        <FontAwesomeIcon icon='plus' color='white' style={{marginRight:'5px'}}/>
                        <p>Add description</p>
                    </div>)}               
            </div>

            <div className='info-box flex-col-ctr'>
                <div><h3>Community rules</h3></div>
                {data?.group_rules ? 
                <div className='info-box-text'><p>{data?.group_rules}</p></div>
                    : 
                    ((user && (user?.role==='CREATOR' || user?.role==='ADMIN')) &&
                    <div className='flex-ctr info-box-add-btn'>
                        <FontAwesomeIcon icon='plus' color='white' style={{marginRight:'5px'}}/>
                        <p>Add rules</p>
                    </div>)}
            </div>
        </>
    )
}
export default memo(InfoBox)