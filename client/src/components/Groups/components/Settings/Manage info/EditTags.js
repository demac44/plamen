import React, { useState } from 'react'

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'

const EditTags = ({gTags, groupid}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [tags, setTags] = useState(gTags.split(','))
    const [updated, setUpdated] = useState(false)
    const [edit_tags] = useMutation(EDIT_TAGS)


    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    const handleEditTags = () => {
        let tagsStr = "";
        tags.map(tag => tagsStr+=tag+',')

        edit_tags({
            variables:{
                groupID: parseInt(groupid),
                tags: tagsStr.slice(0,-1)
            }
        }).then(()=>setUpdated(true))

    }

    return (
        <div className='box flex-col-ctr' style={styles.box}>
            <p style={{fontSize:'18px'}}>Edit community tags</p>

            {updated && <p style={styles.updated}>Updated!</p>}

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

            <button style={styles.editBtn} onClick={handleEditTags} className='btn'>EDIT</button>
        </div>
    )
}

export default EditTags

const styles = {
    box:{
        color:'#aaa',
    },
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
        fontSize:'14px',
        alignSelf:'flex-end'
    },
    updated:{
        padding:'5px 10px',
        marginTop:'10px',
        backgroundColor:'#00752d',
        borderRadius:'10px',
        marginTop:'15px',
        color:'white'
    }
}

const allTags = ['Sport', 'Programming', 'Politics', 'Photography', 'Computers', 'DIY', 'Reading', 'Gaming', 'Comedy', 'Memes', 'Movies']

const EDIT_TAGS = gql`
    mutation ($groupID: Int!, $tags: String!){
        change_group_tags (groupID: $groupID, group_tags: $tags){
            groupID
        }
    }
`