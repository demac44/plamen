import React from 'react'

const ReasonsBar = ({reasons}) => {
    return (
        <div className='tags-box'>
            {reasons.slice(0,-1).split('\n').map(reason => <p style={styles.tag} key={reason}>{reason}</p>)}
        </div>
    )
}

export default ReasonsBar


const styles = {
    tag:{
        padding:'5px 10px',
        backgroundColor:'darkred',
        fontSize:'14px',
        color:'white',
        height:'fit-content',
        borderRadius:'20px',
        marginTop:'5px',
        marginLeft:'5px'
    }
}