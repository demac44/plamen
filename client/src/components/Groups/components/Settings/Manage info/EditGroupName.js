import React, { useState } from 'react'

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'

const EditGroupName = ({group_name, groupid, refetch}) => {
    const [updated, setUpdated] = useState(false)
    const [change_info] = useMutation(CHANGE_NAME)

    const handleSubmit = (e) => {
        e.preventDefault()

        const name = e.target.name.value

        change_info({
            variables:{
                gid: parseInt(groupid),
                name
            }
        }).then(()=>{refetch();setUpdated(true)})
    }

    return (
        <form style={styles.box} className='box flex-col-ctr' onSubmit={handleSubmit}>
            <p style={styles.p}>Change community name</p>
        
            {updated && <p style={styles.updated}>Updated!</p>}
        
            <div style={{width:'100%'}}>
                <span>
                    <p style={{minWidth:'90px', marginTop:'10px'}}>Name: </p>
                    <input 
                        type='text' 
                        id='name'
                        className='input' 
                        style={styles.input} 
                        placeholder='Community name'
                        defaultValue={group_name}
                        />
                </span>
        
            </div>
            <button type='submit' className='btn' style={styles.btn}>EDIT</button>
        </form>
    )
}

export default EditGroupName

const CHANGE_NAME = gql`
    mutation ($gid: Int!, $name: String!){
        change_group_name(groupID: $gid, group_name: $name){
            groupID
        }
    }
`

const styles = {
    box:{
        color:'#aaa',
    },
    input:{
        height:'35px',
        marginTop:'5px',
        padding:'5px'
    },
    btn:{
        padding:'7px 23px',
        marginTop:'20px',
        alignSelf:'flex-end'
    },
    updated:{
        padding:'5px 10px',
        backgroundColor:'#00752d',
        borderRadius:'10px',
        marginTop:'15px',
        color:'white',
        width:'fit-content'
    },
    p:{
        fontSize:'18px',
        textAlign:'center'
    }
}