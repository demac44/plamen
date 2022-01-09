import React, { useCallback, useEffect, useState, memo } from 'react'
import { useSelector } from 'react-redux';
import StoryBar from './Top bar/StoryBar'
import StoryMediaBox from './Story media/StoryMediaBox';
import StoryOptionsBar from './Options bar/StoryOptionsBar';
import StoryReply from './Reply bar/StoryReply';

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'

const Story = ({i, closeStoryCallback, isProfile, allData}) => {
    const [storyData, setStoryData] = useState([])
    const [index, setIndex] = useState(i)
    const [innerIndex, setInnerIndex] = useState(0)
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [seen_story] = useMutation(SEEN_STORY)

    const setIndexCallback = useCallback(val => {
        setIndex(val)
    }, [setIndex])

    const setInnerIndexCallback = useCallback(val => {
        setInnerIndex(val)
    }, [setInnerIndex])

    useEffect(()=>{
        setStoryData(isProfile ? allData : allData[index])
        storyData?.stories && seen_story({
            variables:{
                uid,
                storyID: storyData?.stories[innerIndex]?.storyID
            }
        })
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

                {(isProfile && uid===(storyData?.userID || allData.user.userID)) ?
                <StoryOptionsBar 
                    storyID={storyData?.stories[innerIndex]?.storyID}
                    closeStoryCallback={closeStoryCallback}
                    />
                : <StoryReply 
                    userID={isProfile ? storyData?.stories[innerIndex]?.userID : storyData?.userID}
                    storyID={storyData?.stories[innerIndex]?.storyID}
                    type={storyData?.stories[innerIndex]?.type}
                /> }

            </div>
            : <div className='flex-ctr wh-100' style={{backgroundColor:'#2f2f2f'}}><div className='small-spinner'></div></div>}
        </div>
    )
}

export default memo(Story)

const SEEN_STORY = gql`
    mutation($uid: Int, $storyID: Int){
        seen_story(userID: $uid, storyID: $storyID){
            storyID
        }
    }
`