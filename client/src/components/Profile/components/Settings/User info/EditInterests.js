import React, { useState, useCallback } from 'react'
import './style.css'
import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'
import SearchInterests from '../../../../General components/SearchInterests'

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

    const setInterestsCB = useCallback(val => {
        setTags([...tags, val].filter(onlyUnique))
        tags.filter(onlyUnique)
    }, [tags])

    return (
        <div className='flex-col-ctr box'>
            <p>Edit your interests</p>

            {updated && <p className='updated-msg'>Your interests are updated!</p>}

            {tags.length > 0 && <p className='remove-tag-txt'>Click on tag to remove it</p>}

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
            <SearchInterests setInterest={setInterestsCB}/>

            <button className='btn save-btn' onClick={handleEditInterests}>SAVE</button>
        </div>
    )
}

export default EditInterests

const EDIT_INTERESTS = gql`
    mutation ($userID: Int!, $interests: String!){
        edit_user_interests (userID: $userID, interests: $interests){
            userID
        }
    }
`