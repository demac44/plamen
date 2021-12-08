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
            <div   
                className="story-head" 
                style={{border:'2px solid', 
                    borderColor:"#" + ((1<<24)*Math.random() | 0).toString(16)}} 
                onClick={()=>setOpenStory(true)
            }>
                <Avatar size='60px' image={story?.profile_picture}/>
            </div>
            {openStory && <Story allData={allData} story={story} i={index} closeStoryCallback={closeStoryCallback}/>}
        </>
    )
}

export default StoryHead
