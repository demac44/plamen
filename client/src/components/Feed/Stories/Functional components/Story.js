import React, { useCallback, useEffect, useState } from 'react'
import StoryBar from '../components/StoryBar'
import StoryMediaBox from './StoryMediaBox';
import StoryReply from './StoryReply';

const Story = ({i, story, closeStoryCallback, isProfile, updatedCallback, allData, userInfo}) => {
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
        setStoryData(isProfile ? allData : allData[index])
        storyData?.stories && setType(storyData?.stories[innerIndex]?.type)
    }, [index, innerIndex, type, i, storyData])


    return (
        <div className='story-preview flex-col-ctr'>
            <div className='story-box'>
                <StoryBar user={ isProfile ?
                {
                    first_name: userInfo?.first_name, 
                    last_name: userInfo?.last_name,
                    profile_picture: userInfo?.profile_picture,
                    userID:userInfo?.userID
                }
                :
                {
                    first_name: storyData?.first_name, 
                    last_name: storyData?.last_name,
                    profile_picture: storyData?.profile_picture,
                    userID:storyData?.userID
                }} 
                    date={(isProfile && storyData?.stories) ? storyData.stories[innerIndex]?.date_posted : 
                    (storyData?.stories && storyData?.stories[innerIndex]?.date_posted)}
                    closeStoryCallback={closeStoryCallback}
                    storyID={storyData?.stories && storyData?.stories[innerIndex]?.storyID}
                    updatedCallback={updatedCallback}
                />
                <StoryMediaBox 
                    storyData={storyData} 
                    allDataLength={allData?.length}
                    index={index} 
                    isProfile={isProfile} 
                    closeStoryCallback={closeStoryCallback}
                    setIndexCallback={setIndexCallback}
                    setInnerIndexCallback={setInnerIndexCallback}
                    innerIndex={innerIndex}
                    type={type}/>
                <StoryReply userID={isProfile ? (storyData?.stories && storyData?.stories[innerIndex]?.userID) : storyData?.userID}/>
            </div>
        </div>
    )
}

export default Story

