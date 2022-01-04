import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {gql} from 'graphql-tag'
import {useMutation} from 'react-apollo'

const StoryOptionsBar = ({storyID, closeStoryCallback}) => {
    const [delete_story] = useMutation(DELETE_STORY)


    const handleDelete = () => {
        delete_story({
            variables:{
                storyID
            }
        }).then(closeStoryCallback(false))
    }

    return (
        <div className='stories-options-bar flex-sb'>
            <FontAwesomeIcon 
                icon='trash-alt' 
                size='lg' 
                color='white' 
                onClick={handleDelete}
                cursor='pointer'
            />
        </div>
    )
}

export default StoryOptionsBar


const DELETE_STORY = gql`
    mutation($storyID: Int!){
        delete_story(storyID: $storyID){
            storyID
        }
    }
`