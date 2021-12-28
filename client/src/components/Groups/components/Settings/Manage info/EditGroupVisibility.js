import React, { useState } from 'react'

import {gql} from 'graphql-tag'
import { useMutation} from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        <div style={styles.box} className='box flex-h'>
            <p>Community visibility: </p>

            <div style={styles.switchBox} onClick={handleChange}>
                <FontAwesomeIcon icon='lock' style={{...styles.locks, right:'8px'}} />
                <FontAwesomeIcon icon='lock-open' style={{...styles.locks, left:'5px'}}/>
                <div style={{...styles.switch, 
                            left: visib ? '0' : '32px',
                            backgroundColor: visib ? '#861b1b' : '#00752d'
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
        color:'#aaa',
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
    },
    locks:{
        position:'absolute',
        top:'3px',
        color:'#4f4f4f'
    }
}