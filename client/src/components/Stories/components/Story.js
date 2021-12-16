import React, { useCallback, useEffect, useState, memo } from 'react'
import StoryBar from './StoryBar'
import StoryMediaBox from './StoryMediaBox';
import StoryReply from './StoryReply';

const Story = ({i, closeStoryCallback, isProfile, allData}) => {
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
    }, [index, innerIndex, type, i, storyData, allData, isProfile])


    return (
        <div className='story-overlay flex-col-ctr'>
            <div className='story-box'>
                <StoryBar 
                    user={{
                        first_name: isProfile ? allData.user.first_name : storyData?.first_name, 
                        last_name: isProfile ? allData.user.last_name : storyData?.last_name,
                        profile_picture: isProfile ? allData.user.profile_picture : storyData?.profile_picture,
                        userID:isProfile ? allData.user.userID : storyData?.userID,
                        username:isProfile ? allData.user.username : storyData?.username
                    }} 
                    date={(isProfile && storyData?.stories) ? storyData.stories[innerIndex]?.date_posted : 
                    (storyData?.stories && storyData?.stories[innerIndex]?.date_posted)}
                    closeStoryCallback={closeStoryCallback}
                    storyID={storyData?.stories && storyData?.stories[innerIndex]?.storyID}
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

export default memo(Story)

