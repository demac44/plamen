import React, { useCallback, useState } from 'react'
import Story from './Story'
import Avatar from '../../General components/Avatar'

const StoryHead = ({index, story, allData}) => {
    const [openStory, setOpenStory] = useState(false)

    const closeStoryCallback = useCallback(()=>{
        setOpenStory(false)
    }, [setOpenStory])

    return (
        <>
            <div className="story-head" onClick={()=>setOpenStory(true)}>
                <Avatar size='65px' pfp={story?.profile_picture}/>
            </div>
            {openStory && <Story allData={allData} story={story} i={index} closeStoryCallback={closeStoryCallback}/>}
        </>
    )
}

export default StoryHead
