import React from 'react'

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const DELETE_STORY = gql`
    mutation ($sid: Int!){
        delete_story (storyID: $sid){
            storyID
        }
    }
`

const StoryOptions = ({storyID, closeStoryCallback}) => {
    const [delete_story] = useMutation(DELETE_STORY)

    const handleRemove = () => {
        delete_story({
            variables:{sid: storyID}
        }).then(()=>{closeStoryCallback()})
    }

    return (
        <span style={{height:'100%', width:'40px'}} className='flex-ctr'>
            <FontAwesomeIcon 
                icon='trash-alt' 
                size='normal' 
                color='white' 
                onClick={handleRemove}
                fixedWidth
            />
        </span>
    )
}

export default StoryOptions
