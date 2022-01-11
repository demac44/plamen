import React from 'react'
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
            <i 
                className='fas fa-trash-alt' 
                onClick={handleDelete}
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