import React, { useCallback, useState, memo } from 'react'
import Story from '../Story/Story'
import Avatar from '../../../General components/Avatar'

const StoryHead = ({index, story, allData, seen}) => {
    const [openStory, setOpenStory] = useState(false)

    const closeStoryCallback = useCallback(()=>{
        setOpenStory(false)
    }, [setOpenStory])

    return (
        <>
            <div   
                className="story-head" 
                style={{border:seen ? 'none' : '2px solid #ffbb00'}} 
                onClick={()=>setOpenStory(true)
            }>
                <Avatar size='60px' image={story?.profile_picture}/>
            </div>
            {openStory && <Story allData={allData} i={index} closeStoryCallback={closeStoryCallback}/>}
        </>
    )
}

export default memo(StoryHead)
