import React, { useState } from 'react'

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'

const ShowActivity = ({visibility}) => {
    const [change_visibility] = useMutation(CHANGE_VISIBILITY)
    const [visib, setVisib] = useState(visibility)

    const handleChange = () => {
    
    }

    return (
        <div style={{color:'#aaa'}} className='box flex-h'>
            <p>Activity status: </p>

            <div style={styles.switchBox} onClick={handleChange}>
                <p style={{...styles.locks, left:'6px'}}>ON</p>
                <p style={{...styles.locks, right:'5px'}}>OFF</p>
                <div style={{...styles.switch, 
                            left: visib ? '0' : '32px',
                            backgroundColor: visib ? '#861b1b' : '#00752d'
                }}></div>
            </div>

        </div>
    )
}

export default ShowActivity

const CHANGE_VISIBILITY = gql`
    mutation ($gid: Int!, $closed: Boolean!){
        change_group_visibility (groupID: $gid, closed: $closed){
            closed
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