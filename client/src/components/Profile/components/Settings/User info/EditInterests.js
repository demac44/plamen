import React, { useState } from 'react'

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'

const EditInterests = ({data, uid}) => {
    const [tags, setTags] = useState(data.split(','))
    const [updated, setUpdated] = useState(false)
    const [edit_interests, {error}] = useMutation(EDIT_INTERESTS)


    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    const handleEditInterests = () => {
        let tagsStr = "";
        tags.map(tag => tagsStr+=tag+',')

        edit_interests({
            variables:{
                userID: uid,
                interests: tagsStr.slice(0,-1)
            }
        }).then(()=>setUpdated(true))
    }

    if(error) console.log(error);

    return (
        <div className='flex-col-ctr box'>
            <p>Edit your interests</p>

            {updated && <p style={styles.updated}>Your interests are updated!</p>}

            {tags.length > 0 && <p style={{color:'white', fontSize:'12px', marginTop:'10px'}}>Click on tag to remove it</p>}

            <div className='tags-box' style={{backgroundColor:'white'}}>
                {tags.map(tag => 
                <div
                    style={styles.tag}
                    onClick={()=>{tags.splice(tags.indexOf(tag), 1);setTags([...tags])}}
                    key={tag}
                >
                    {tag}
                </div>)}
            </div>
            <select 
                style={styles.selectTags}
                onChange={(e)=>{
                    let arr = tags.filter(onlyUnique)
                    setTags([...arr, e.target.value].filter(onlyUnique))
                    tags.filter(onlyUnique)
                }}>
                {allTags.map(tag => <option value={tag} key={tag}>{tag}</option>)}
            </select>

            <p style={styles.editBtn} onClick={handleEditInterests}>EDIT</p>
        </div>
    )
}

export default EditInterests

const styles = {
    tag:{
        padding:'5px 10px',
        backgroundColor:'#13306e',
        fontSize:'14px',
        color:'white',
        height:'fit-content',
        borderRadius:'20px',
        marginTop:'5px',
        marginLeft:'5px'
    },
    selectTags:{
        width:'200px',
        height:'35px',
        marginTop:'20px',
        borderRadius:'30px',
        border:'1px solid #ffbb00',
        padding:'5px'
    },
    editBtn:{
        padding:'5px 20px',
        border:'1px solid #2f2f2f',
        borderRadius:'10px',
        marginTop:'20px',
        cursor:'pointer',
        fontSize:'14px'
    },
    updated:{
        padding:'5px 10px',
        marginTop:'10px',
        backgroundColor:'#0e7947',
        borderRadius:'10px'
    }
}

const allTags = ['Sport', 'Programming', 'Politics', 'Photography', 'Computers', 'DIY', 'Reading', 'Gaming', 'Comedy', 'Memes', 'Movies']

const EDIT_INTERESTS = gql`
    mutation ($userID: Int!, $interests: String!){
        edit_user_interests (userID: $userID, interests: $interests){
            userID
        }
    }
`