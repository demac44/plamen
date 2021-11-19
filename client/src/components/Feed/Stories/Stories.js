import React from 'react'
import AddStory from './Functional components/AddStory'
import StoryHead from './Functional components/StoryHead'
import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'

const GET_STORIES = gql`
    query ($uid: Int!){
        get_stories (userID: $uid){
            storyID
            profile_picture
            first_name
            last_name
            userID
            type
            stories {
                type
                url
                date_posted
            }
        }
    }
`

const Stories = () => {
    let index = 0 
    const ls = JSON.parse(localStorage.getItem('user'))
    const {data, loading} = useQuery(GET_STORIES, {
        variables:{uid: ls.userID}
    })

    if(loading) return <p>loading</p>

    return (
        <div className="stories-container">
            <AddStory/>
            {data?.get_stories?.map(story => <StoryHead info={story} data={data} index={index++} key={story.storyID}/>)}
        </div>
    )
}

export default Stories
