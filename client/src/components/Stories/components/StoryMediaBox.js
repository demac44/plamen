import React, {useState, useEffect} from 'react'

const StoryMediaBox = ({storyData ,isProfile, closeStoryCallback, index, setIndexCallback, type,  setInnerIndexCallback, innerIndex, allDataLength}) => {
    let timeout;
    const [url, setUrl] = useState(null)
    
    const nextStory = () => {
        clearTimeout(timeout)
        if(storyData){
            if(index===(isProfile ? 0 : allDataLength-1) && innerIndex===storyData?.stories?.length-1){
                closeStoryCallback()
                return
            } else if (innerIndex===storyData?.stories?.length-1){
                setIndexCallback(index+1)
                setInnerIndexCallback(0)
            } else  setInnerIndexCallback(innerIndex+1)
        }
    } 
    
    const prevStory = () => {
        clearTimeout(timeout)
        if(storyData){
            if(index===0 && innerIndex===0){
                closeStoryCallback()
                return
            } else if (index>0 && innerIndex===0){
                setIndexCallback(index-1)
                setInnerIndexCallback(0)
            } else if (index>=0 && innerIndex>0){
                setInnerIndexCallback(innerIndex-1)
            }
        }
    }

    useEffect(()=>{
        storyData?.stories && setUrl(storyData && storyData?.stories[innerIndex]?.url)
    }, [storyData, innerIndex])

    return (
        <div className='story-media flex-ctr'>
            {type==='image' && 
                (!url ? <div className='small-spinner'></div> : 
                <img src={url} onLoad={()=>{
                    timeout = setTimeout(()=>{
                        nextStory()
                    }, 5000)
                    return
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
                    {(url && type==='image') && <div className={story.storyID===storyData?.stories[innerIndex]?.storyID ? 'load-bar' : 'bar'}></div>}
                    {(url && type==='video') && <div className={story.storyID===storyData?.stories[innerIndex]?.storyID ? 'bar bar-vid' : 'bar'}></div>}
                </div>)}
            </div> 
        </div>
    )
}

export default StoryMediaBox
