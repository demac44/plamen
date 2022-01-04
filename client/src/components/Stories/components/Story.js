import React, { useCallback, useEffect, useState, memo } from 'react'
import { useSelector } from 'react-redux';
import StoryBar from './StoryBar'
import StoryMediaBox from './StoryMediaBox';
import StoryOptionsBar from './StoryOptionsBar';
import StoryReply from './StoryReply';

const Story = ({i, closeStoryCallback, isProfile, allData}) => {
    const [storyData, setStoryData] = useState([])
    const [index, setIndex] = useState(i)
    const [innerIndex, setInnerIndex] = useState(0)
    const uid = useSelector(state => state?.isAuth?.user?.userID)

    const setIndexCallback = useCallback(val => {
        setIndex(val)
    }, [setIndex])

    const setInnerIndexCallback = useCallback(val => {
        setInnerIndex(val)
    }, [setInnerIndex])

    useEffect(()=>{
        setStoryData(isProfile ? allData : allData[index])
    }, [index, innerIndex, i, storyData, allData, isProfile])

    return (
        <div className='overlay flex-col-ctr' style={{backgroundColor: '#1b1b1b'}}>
            {storyData?.stories ? 
            <div className='story-box'>

                <StoryBar 
                    user={{
                        profile_picture: isProfile ? allData.user.profile_picture : storyData?.profile_picture,
                        username:isProfile ? allData.user.username : storyData?.username
                    }} 
                    date={storyData.stories[innerIndex]?.date_posted}
                    closeStoryCallback={closeStoryCallback}
                    storyID={storyData?.stories[innerIndex]?.storyID}
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
                    type={storyData?.stories[innerIndex]?.type}
                    userID={isProfile ? allData.user.userID : storyData?.userID}
                />

                {(!isProfile && uid===(isProfile ? allData.user.userID : storyData?.userID)) ?
                <StoryReply 
                    userID={isProfile ? storyData?.stories[innerIndex]?.userID : storyData?.userID}
                    storyID={storyData?.stories[innerIndex]?.storyID}
                    type={storyData?.stories[innerIndex]?.type}
                /> 
                : <StoryOptionsBar 
                    storyID={storyData?.stories[innerIndex]?.storyID}
                    closeStoryCallback={closeStoryCallback}
                    />}

            </div>
            : <div className='flex-ctr wh-100' style={{backgroundColor:'#2f2f2f'}}><div className='small-spinner'></div></div>}
        </div>
    )
}

export default memo(Story)

