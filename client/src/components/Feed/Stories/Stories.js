import React, { useEffect, useState } from 'react'
import AddStory from './Functional components/AddStory'
import StoryHead from './Functional components/StoryHead'
import StoriesLoader from './components/StoriesLoader'

const Stories = ({stories, updatedCallback}) => {
    const [width, setWidth] = useState(0)
    const [margin, setMargin] = useState(0)
    let index = 0 

    useEffect(()=>{
        if(stories){
            let i = 0
            stories.map(s => {
                i++
            })
            // each story head is 64px wide
            setWidth(i*64)
        }
    }, [stories])


    return (
        <div className="stories-container">
            <div className='sc-inner' style={{marginLeft:-margin.toString()+'%'}}>
                <div className='flex-col-ctr'>
                    <AddStory updatedCallback={updatedCallback}/>
                    <p style={{fontSize:'14px',color:'white'}}>Add story</p>
                </div>
                {stories.map(story => (
                    <div className='flex-col-ctr' style={{marginLeft:'10px'}}  key={story?.storyID}>
                        <StoryHead story={story} allData={stories} index={index++} updatedCallback={updatedCallback}/>
                        <p style={{fontSize:'14px', color:'white'}}>{story?.username}</p>
                    </div>
                ))}
            </div>
            {margin > 0 && <div className='stories-btn-left flex-ctr' onClick={()=>setMargin(margin > 0 ? margin-100 : 0)}><i className="fas fa-chevron-left"></i></div>}
            <div className='stories-btn-right flex-ctr' onClick={()=>setMargin(margin+100 > width ? margin :margin+100)}><i className="fas fa-chevron-right"></i></div>
        </div>
    )
}

export default Stories
