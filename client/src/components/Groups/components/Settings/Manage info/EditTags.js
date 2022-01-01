import React, { useState } from 'react'
import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'
import './style.css'

const EditTags = ({gTags, groupid}) => {
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
        <div className='box flex-col-ctr'>
            <p>Edit community tags</p>

            {updated && <p className='updated-msg'>Updated!</p>}

            {tags.length > 0 && <p className='remove-tag-title'>Click on tag to remove it</p>}

            <div className='tags-box'>
                {tags.map(tag => 
                <div
                    className='tag'
                    onClick={()=>{tags.splice(tags.indexOf(tag), 1);setTags([...tags])}}
                    key={tag}
                >
                    {tag}
                </div>)}
            </div>
            <select 
                className='edit-gp-tags-select'
                onChange={(e)=>{
                    let arr = tags.filter(onlyUnique)
                    setTags([...arr, e.target.value].filter(onlyUnique))
                    tags.filter(onlyUnique)
                }}>
                {allTags.map(tag => <option value={tag} key={tag}>{tag}</option>)}
            </select>

            <button onClick={handleEditTags} className='btn edit-form-btn'>SAVE</button>
        </div>
    )
}

export default EditTags

const allTags = ['Sport', 'Programming', 'Politics', 'Photography', 'Computers', 'DIY', 'Reading', 'Gaming', 'Comedy', 'Memes', 'Movies']

const EDIT_TAGS = gql`
    mutation ($groupID: Int!, $tags: String!){
        change_group_tags (groupID: $groupID, group_tags: $tags){
            groupID
        }
    }
`