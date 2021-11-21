import React, { useCallback, useEffect, useState } from 'react'
import StoryBar from '../components/StoryBar'
import StoryMediaBox from './StoryMediaBox';
import StoryReply from './StoryReply';

const Story = ({data, i, closeStoryCallback, isProfile, info, updatedCallback}) => {
    const [storyData, setStoryData] = useState([])
    const [index, setIndex] = useState(i)
    const [innerIndex, setInnerIndex] = useState(0)
    const [type, setType] = useState('')

    const setIndexCallback = useCallback(val => {
        setIndex(val)
    }, [setIndex])

    const setInnerIndexCallback = useCallback(val => {
        setInnerIndex(val)
    }, [setInnerIndex])

    useEffect(()=>{
        setStoryData(isProfile ? data : data[index])
        storyData?.stories && setType(storyData?.stories[innerIndex]?.type)
    }, [data, index, innerIndex, type, i, storyData?.stories])

    return (
        <div className='story-preview flex-col-ctr'>
            <div className='story-box'>
                <StoryBar user={isProfile ? 
                {
                    first_name: info.first_name, 
                    last_name: info.last_name,
                    profile_picture: info.profile_picture,
                    userID:info.userID
                } :
                {
                    first_name: storyData?.first_name, 
                    last_name: storyData?.last_name,
                    profile_picture: storyData?.profile_picture,
                    userID:storyData?.userID
                }} 
                    date={(isProfile && storyData?.stories) ? storyData.stories[innerIndex]?.date_posted : 
                    (storyData?.stories && storyData?.stories[innerIndex]?.date_posted)}
                    closeStoryCallback={closeStoryCallback}
                    storyID={storyData?.stories && storyData.stories[innerIndex]?.storyID}
                    updatedCallback={updatedCallback}
                />
                <StoryMediaBox 
                    storyData={storyData} 
                    index={index} 
                    isProfile={isProfile} 
                    data={data} 
                    closeStoryCallback={closeStoryCallback}
                    setIndexCallback={setIndexCallback}
                    setInnerIndexCallback={setInnerIndexCallback}
                    innerIndex={innerIndex}
                    type={type}/>
                <StoryReply userID={info.userID}/>
            </div>
        </div>
    )
}

export default Story

