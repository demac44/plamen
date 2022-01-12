import React, {useState, useEffect, memo} from 'react'
import { Link } from 'react-router-dom'

const editBtnRoles = ["CREATOR", "ADMIN"]

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
                <p className='flex-ctr' style={{padding:'15px 0 0 0', fontSize:'14px'}}>Created on {dateCreated}</p>
            </div>

            <div className='info-box flex-col-ctr'>
                <div className='flex-sb wh-100'>
                    <h3>Description</h3>
                    {editBtnRoles.includes(user?.role)
                        && <Link to={'/community/'+data?.groupID+'/settings/edit_info'} className='side-box-link-btn'>Edit</Link>}
                </div>
                {data?.group_description ? 
                <div className='info-box-text'>{data?.group_description}</div>
                    :  
                    (editBtnRoles.includes(user?.role) &&
                    <div className='flex-ctr info-box-add-btn'>
                        <i className='fas fa-plus' style={{marginRight:'5px',color: 'white'}}/>
                        <p>Add description</p>
                    </div>)}               
            </div>

            <div className='info-box flex-col-ctr'>
                <div className='flex-sb wh-100'>
                    <h3>Community rules</h3>
                    {editBtnRoles.includes(user?.role) 
                        && <Link to={'/community/'+data?.groupID+'/settings/edit_info'} className='side-box-link-btn'>Edit</Link>}
                </div>
                {data?.group_rules &&
                    <div className='info-box-text'><p>{data?.group_rules}</p></div>}
            </div>
        </>
    )
}
export default memo(InfoBox)