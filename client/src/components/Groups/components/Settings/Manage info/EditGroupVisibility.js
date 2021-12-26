import React, { useState } from 'react'

import {gql} from 'graphql-tag'
import { useMutation} from 'react-apollo';

const EditGroupVisibility = ({visibility, groupid, refetch}) => {
    const [change_visibility] = useMutation(CHANGE_VISIBILITY)
    const [visib, setVisib] = useState(visibility)

    const handleChange = () => {
        change_visibility({
            variables:{
                gid: parseInt(groupid),
                closed: visib
            }
        }).then(()=>{setVisib(!visib);refetch()})
    }

    return (
        <div style={styles.box} className='flex-h'>
            <p>Change group visibility: </p>
            <div style={styles.switchBox} onClick={handleChange}>
                <div style={{...styles.switch, 
                            left: visib ? '32px' : '0',
                            backgroundColor: visib ? 'darkgreen' : 'darkred'
                }}></div>
            </div>
        </div>
    )
}

export default EditGroupVisibility

const CHANGE_VISIBILITY = gql`
    mutation ($gid: Int!, $closed: Boolean!){
        change_group_visibility (groupID: $gid, closed: $closed){
            closed
        }
    }
`

const styles = {
    box:{
        width:'100%',
        padding:'10px',
        boxShadow:'5px 5px 10px black',
        borderRadius:'10px',
        color:'#aaa',
        marginTop:'15px'
    },
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
    }
}