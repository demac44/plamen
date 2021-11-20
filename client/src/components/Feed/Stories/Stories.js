import React, { useEffect, useState } from 'react'
import AddStory from './Functional components/AddStory'
import StoryHead from './Functional components/StoryHead'
import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import StoriesLoader from './components/StoriesLoader'

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
                storyID
                type
                url
                date_posted
            }
        }
    }
`

const Stories = () => {
    const [width, setWidth] = useState(0)
    const [margin, setMargin] = useState(0)
    let index = 0 
    const ls = JSON.parse(localStorage.getItem('user'))
    const {data, loading} = useQuery(GET_STORIES, {
        variables:{uid: ls.userID}
    })

    useEffect(()=>{
        if(data){
            let i = 0
            data.get_stories.map(s => {
                i++
            })
            // each story head is 64px wide
            setWidth(i*64)
        }
    }, [data])

    if(loading) return <StoriesLoader/>

    return (
        <div className="stories-container">
            <div className='sc-inner' style={{marginLeft:-margin.toString()+'%'}}>
                <AddStory/>
                {data?.get_stories?.map(story => <StoryHead info={story} data={data} index={index++} key={story.storyID}/>)}
            </div>
            {margin > 0 && <div className='stories-btn-left flex-ctr' onClick={()=>setMargin(margin > 0 ? margin-100 : 0)}><i className="fas fa-chevron-left"></i></div>}
            <div className='stories-btn-right flex-ctr' onClick={()=>setMargin(margin+100 > width ? margin :margin+100)}><i className="fas fa-chevron-right"></i></div>
        </div>
    )
}

export default Stories
