import React, { useCallback, useState } from 'react'
import Avatar from '../../../UI/Avatar'
import Story from './Story'

const StoryHead = ({index, story, updatedCallback, allData}) => {
    const [openStory, setOpenStory] = useState(false)

    const closeStoryCallback = useCallback(()=>{
        setOpenStory(false)
    }, [setOpenStory])

    return (
        <>
            <div className="story-head" onClick={()=>setOpenStory(true)}>
                <Avatar height='64px' width='64px' pfp={story?.profile_picture}/>
            </div>
            {openStory && <Story allData={allData} story={story} i={index} closeStoryCallback={closeStoryCallback} updatedCallback={updatedCallback}/>}
        </>
    )
}

export default StoryHead
