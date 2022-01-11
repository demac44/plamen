import React, { useState } from 'react'
import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux';
import './style.css'

const CREATE_GROUP = gql`
    mutation ($uid: Int!, $gname: String!, $closed: Boolean!, $desc:String!, $tags: String!){
        create_group(group_name:$gname, group_creator_id: $uid, closed: $closed, group_description: $desc, group_tags:$tags){
            group_name
        }
    }
`


const CreateGroupForm = ({closeFormCallback}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [tags, setTags] = useState([])
    const [create_group] = useMutation(CREATE_GROUP)


    const handleSubmit = (e) => {
        e.preventDefault()
        let tagsStr = '';
        let closed;

        const gname = e.target.name.value
        if(e.target.closed.value==='private') closed = true
        else if (e.target.closed.value==='public') closed = false
        else return null
        const desc = e.target.description.value
        
        tags.map(tag => tagsStr+=tag+',')

        create_group({
            variables:{
                uid,
                gname,
                closed,
                desc,
                tags:tagsStr.slice(0,-1)
            }
        }).then(()=>closeFormCallback())
    } 

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }

    return (
        <div className='flex-ctr overlay' style={{backgroundColor: 'rgba(0, 0, 0,0.7)'}}>
            <form className='create-group-form flex-col-ctr' onSubmit={handleSubmit}>
                <i className='fas fa-times cg-box-exit-btn' onClick={()=>closeFormCallback()}/>
                <h3>Community name:</h3>
                <input placeholder='Community name...' id='name'></input>

                <h3>Visibility:</h3>
                <p>You change this later</p>
                <select id='closed'>
                    <option value='private'>Private</option>
                    <option value='public'>Public</option>
                </select>

                <h3>Add community description:</h3>
                <textarea placeholder='Description...' id='description'></textarea>
                
                <h3>Add community tags:</h3>
                {tags.length > 0 && <p>Click on tag to remove it</p>}
                <div className='tags-box'>
                    {tags.map(tag => <div
                        className='tag'
                        onClick={()=>{tags.splice(tags.indexOf(tag), 1);setTags([...tags])}}
                        key={tag}
                    >{tag}</div>)}
                </div>
                <select 
                    onChange={(e)=>{
                        let arr = tags.filter(onlyUnique)
                        setTags([...arr, e.target.value].filter(onlyUnique))
                        tags.filter(onlyUnique)
                    }}>
                    {allTags.map(tag => <option value={tag} key={tag}>{tag}</option>)}
                </select>
                <button type='submit' className='btn'>CREATE</button>
            </form>
        </div>
    )
}

export default CreateGroupForm

const allTags = ['Sport', 'Programming', 'Politics', 'Photography', 'Computers', 'DIY', 'Reading', 'Gaming', 'Comedy', 'Memes', 'Movies']