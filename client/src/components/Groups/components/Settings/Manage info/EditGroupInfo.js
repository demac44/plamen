import React, {useState} from 'react'

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'

const EditGroupInfo = ({data, refetch}) => {
    const [change_info] = useMutation(CHANGE_INFO)
    const [updated, setUpdated] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        const desc = e.target.desc.value
        const rules = e.target.rules.value

        change_info({
            variables:{
                gid: data.groupID,
                desc,
                rules
            }
        }).then(()=>{refetch();setUpdated(true)})
    }

    return (
        <form style={styles.box} className='flex-col-ctr' onSubmit={handleSubmit}>
            <p style={{fontSize:'18px'}}>Description and rules</p>

            {updated && <p style={styles.updated}>Updated!</p>}

            <div style={{width:'100%', marginTop:'15px'}}>

                <span>
                    <p style={{minWidth:'90px', marginTop:'10px'}}>Description: </p>
                    <textarea
                        type='text' 
                        id='desc'
                        style={styles.textarea} 
                        placeholder='Community description'
                    >{data.group_description}</textarea>
                </span>

                <span>
                    <p style={{minWidth:'90px', marginTop:'10px'}}>Rules: </p>
                    <textarea 
                        type='text' 
                        id='rules'
                        style={styles.textarea} 
                        placeholder='Community rules'
                    >{data.group_rules}</textarea>
                </span>

            </div>

            <button type='submit' className='btn' style={styles.btn}>EDIT</button>
        </form>
    )
}

export default EditGroupInfo

const CHANGE_INFO = gql`
    mutation ($gid: Int!, $desc: String!, $rules: String!){
        change_group_info(groupID: $gid, group_description: $desc, group_rules: $rules){
            groupID
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
    textarea:{
        width:'100%',
        minHeight:'100px',
        resize:'none',
        marginTop:'5px',
        padding:'5px',
        borderRadius:'10px',
        border:'none',
        outline:'none',
        fontSize:'14px'
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
        color:'white'
    }
}