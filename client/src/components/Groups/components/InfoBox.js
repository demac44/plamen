import React from 'react'

const InfoBox = ({data, user}) => {
    return (
        <div className='group-info-container'>
            <div className='group-info-box flex-col-ctr'>
                <div style={styles.descTitle}><h2>Description</h2></div>
                {data.group_description ? 
                <div style={styles.textBoxDesc}>{data.group_description}</div>
                    : <div style={styles.addInfoBtn}><i className='fas fa-plus' style={{marginRight:'10px'}}></i><h3> Add description</h3></div>}               
            </div>
            <div className='group-info-box flex-col-ctr'>
                <div style={styles.descTitle}><h2>Community rules</h2></div>
                {data.group_rules ? 
                <div style={styles.textBoxDesc}><p>{data.group_rules}</p></div>
                    : 
                    ((user && (user.role==='CREATOR' || user.role==='ADMIN')) &&
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
    }
}