import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

const InfoBox = ({data, user, membersCount}) => {
    const [dateCreated, setDateCreated] = useState('')

    useEffect(()=>{
        let date = parseInt(data.date_created)
        date = new Date(date).toDateString()
        setDateCreated(date)
    }, [data])

    return (
        <div className='group-info-container'>
            <div className='group-info-box'>
                <div style={styles.descTitle}><h2>Information</h2></div>
                <div className='flex-sb' style={{padding:'5px', color:'white'}}>
                    <p>{membersCount} members</p>
                    <Link to={'/community/'+data.groupID+'/members'} style={styles.seeAllBtn}>See all</Link>
                </div>
                <p style={{color:'white', padding:'5px'}}>Created on {dateCreated}</p>
            </div>

            <div className='group-info-box flex-col-ctr'>
                <div style={styles.descTitle}><h2>Description</h2></div>
                {data?.group_description ? 
                <div style={styles.textBoxDesc}>{data?.group_description}</div>
                    :  
                    ((user && (user?.role==='CREATOR' || user?.role==='ADMIN')) &&
                    <div className='flex-ctr' style={styles.addInfoBtn}>
                        <i style={{marginRight:'5px'}} className='fas fa-plus'></i><h3>Add description</h3></div>)}               
            </div>

            <div className='group-info-box flex-col-ctr'>
                <div style={styles.descTitle}><h2>Community rules</h2></div>
                {data?.group_rules ? 
                <div style={styles.textBoxDesc}><p>{data?.group_rules}</p></div>
                    : 
                    ((user && (user?.role==='CREATOR' || user?.role==='ADMIN')) &&
                    <div className='flex-ctr' style={styles.addInfoBtn}>
                        <i style={{marginRight:'5px'}} className='fas fa-plus'></i><h3>Add rules</h3></div>)}
            </div>
    </div>
    )
}

export default InfoBox


const styles = {
    descTitle:{
        width:'100%',
        padding:'5px',
        textAlign:'center',
        color:'white'
    },
    textBoxDesc:{
        width:'100%',
        height:'fit-content',
        backgroundColor:'white',
        padding:'5px',
        wordWrap:'break-word'
    },
    addInfoBtn:{
        width:'100%',
        padding:'10px',
        borderRadius:'10px',
        backgroundColor:'#2f2f2f',
        textAlign:'center',
        color:'white',
        cursor:'pointer'
    },
    seeAllBtn:{
        padding:'5px 10px',
        backgroundColor:'#2f2f2f',
        borderRadius:'10px',
        fontSize:'14px',
        color:'white'
    }
}