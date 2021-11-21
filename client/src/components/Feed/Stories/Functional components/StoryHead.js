import React, { useCallback, useState } from 'react'
import Avatar from '../../../UI/Avatar'
import Story from './Story'

const StoryHead = ({data, info, index, updatedCallback}) => {
    const [openStory, setOpenStory] = useState(false)

    const closeStoryCallback = useCallback(()=>{
        setOpenStory(false)
    }, [setOpenStory])

    return (
        <>
            <div className="story-head" onClick={()=>setOpenStory(true)}>
                <Avatar height='100%' width='64px' pfp={info?.profile_picture}/>
            </div>
            {openStory && <Story info={info} data={data} i={index} closeStoryCallback={closeStoryCallback} updatedCallback={updatedCallback}/>}
        </>
    )
}

export default StoryHead
