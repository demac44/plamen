import React from 'react'

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'


const DELETE_STORY = gql`
    mutation ($sid: Int!){
        delete_story (storyID: $sid){
            storyID
        }
    }
`

const StoryOptions = ({storyID, closeStoryCallback,updatedCallback}) => {
    const [delete_story] = useMutation(DELETE_STORY)

    const handleRemove = () => {
        delete_story({
            variables:{sid: storyID}
        }).then(()=>{closeStoryCallback();updatedCallback(true)})
    }

    return (
        <div>
            <ul>
                <li onClick={handleRemove}><i 
                    className='fas fa-trash-alt'
                ></i></li>
            </ul>
        </div>
    )
}

export default StoryOptions
