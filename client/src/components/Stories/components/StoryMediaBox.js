import React, {useState, useEffect, memo} from 'react'
import { useSelector } from 'react-redux';

const StoryMediaBox = ({
                        storyData ,isProfile, closeStoryCallback, 
                        index, setIndexCallback, type,  setInnerIndexCallback,
                        innerIndex, allDataLength, userID
                    }) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [url, setUrl] = useState(null)
    const [loadBar, setLoadBar] = useState(false)
    const [timeout, setTimeoutt] = useState(null)
    
    const nextStory = () => {
        window.clearTimeout(timeout)
        if(storyData){
            if(index===(isProfile ? 0 : allDataLength-1) && innerIndex===storyData?.stories?.length-1){
                closeStoryCallback(false)
                return
            } else if (innerIndex===storyData?.stories?.length-1){
                setIndexCallback(index+1)
                setInnerIndexCallback(0)
                return
            } else { setInnerIndexCallback(innerIndex+1); return}
        }
        return
    } 
    
    const prevStory = () => {
        window.clearTimeout(timeout)
        if(storyData){
            if(index===0 && innerIndex===0){
                closeStoryCallback(false)
                return
            } else if (index>0 && innerIndex===0){
                setIndexCallback(index-1)
                setInnerIndexCallback(0)
                return
            } else if (index>=0 && innerIndex>0){
                setInnerIndexCallback(innerIndex-1)
                return
            }
        }
        return
    }

    useEffect(()=>{
        storyData?.stories && setUrl(storyData && storyData?.stories[innerIndex]?.url)
        return
    }, [storyData, innerIndex])

    return (
        <div className='story-media flex-ctr'>
            {type==='image' && 
                (!url ? <div className='small-spinner'></div> : 
                <img src={url} onLoad={()=>{
                    if(!isProfile || (isProfile && uid!==userID)){
                        setLoadBar(true)
                        setTimeoutt(setTimeout(()=> {nextStory()}, 5000))
                    }
                }} alt=''/>)
            }
            {type==='video' && 
            (!url ? <div className='small-spinner'></div> :
            <>
                <video className='story-vid' 
                src={url} 
                autoPlay 
                controls 
                controlsList="nodownload" 
                onEnded={nextStory}/>
            </>)}
            <button className='nextBtn' onClick={nextStory}></button>
            <button className='prevBtn' onClick={prevStory}></button>
            <div className='story-count-bars'>
                {storyData?.stories && storyData.stories.map(story => 
                <div className='story-count-bar' key={story.storyID}>
                    {(!isProfile || (isProfile && uid!==userID)) && 
                        <>
                            {(url && type==='image' && loadBar) && <div className={story.storyID===storyData?.stories[innerIndex]?.storyID ? 'load-bar' : 'load-bar-full'}></div>}
                            {(url && type==='video' && loadBar) && <div className={story.storyID===storyData?.stories[innerIndex]?.storyID ? 'load-bar-full bar-vid' : 'load-bar-full'}></div>}
                        </>
                    }
                </div>)}
            </div>
        </div>
    )
}

export default memo(StoryMediaBox)
