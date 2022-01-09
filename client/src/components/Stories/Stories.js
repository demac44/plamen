import React, { useEffect, useState, memo } from 'react'
import AddStory from './components/All stories container/AddStory'
import StoryHead from './components/All stories container/StoryHead'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './components/style.css'
import './Stories.css'

const Stories = ({stories, refetch, seenStories}) => {
    const [width, setWidth] = useState(0)
    const [margin, setMargin] = useState(0)
    let index = 0 

    useEffect(()=>{
        if(stories){
            // each story head is 64px wide
            setWidth(stories?.length*64)
        }
    }, [stories,seenStories])

    return (
        <div className="container-stories flex-ac">
            <div className='inner-container-stories' style={{marginLeft:-margin.toString()+'%'}}>
                <div className='flex-col-ctr'>
                    <AddStory refetch={refetch}/>
                    <p style={{fontSize:'14px'}}>Add story</p>
                </div>
                {/* not seen stories */}
                {stories.map(story => (
                    seenStories.includes(story?.stories[story?.stories?.length-1].storyID) ?
                    <div className='flex-col-ctr story-head-box' key={story?.storyID}>
                        <StoryHead story={story} seen={true} allData={stories} index={index++}/>
                        <p>{story?.username}</p>
                    </div>
                    : <div className='flex-col-ctr story-head-box' key={story?.storyID}>
                        <StoryHead story={story} seen={false} allData={stories} index={index++}/>
                        <p>{story?.username}</p>
                    </div>
                ))}
            </div>
            {/* stories buttons */}
            {margin > 0 && 
                <div 
                    className='flex-ctr list-stories-btn-left list-stories-btn' 
                    onClick={()=>setMargin(margin > 0 ? margin-100 : 0)}
                    >
                    <FontAwesomeIcon icon='chevron-left' color='white'/>
                </div>}
            <div 
                className='flex-ctr list-stories-btn-right list-stories-btn' 
                onClick={()=>setMargin(margin+100 > width ? margin :margin+100)}
                >
                <FontAwesomeIcon icon='chevron-right' color='white'/>
            </div>
        </div>
    )
}

export default memo(Stories)