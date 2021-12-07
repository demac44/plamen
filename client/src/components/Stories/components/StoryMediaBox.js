import React from 'react'

const StoryMediaBox = ({storyData ,isProfile, closeStoryCallback, index, setIndexCallback, type,  setInnerIndexCallback, innerIndex, allDataLength}) => {
    let timeout;
        
    const nextStory = () => {
        clearTimeout(timeout)
        if(storyData){
            if(index===(isProfile ? 0 : allDataLength-1) && innerIndex===storyData?.stories?.length-1){
                closeStoryCallback()
                return
            } else if (innerIndex===storyData?.stories?.length-1){
                 setInnerIndexCallback(0)
                setIndexCallback(index+1)
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
                 setInnerIndexCallback(allDataLength-1)
                setIndexCallback(index-1)
            } else if (index>=0 && innerIndex>0){
                 setInnerIndexCallback(innerIndex-1)
            }
        }
    }
    return (
        <div className='story-media flex-ctr'>
            {type==='image' && 
                <img src={storyData && storyData?.stories[innerIndex]?.url} onLoad={()=>{
                    timeout = setTimeout(()=>{
                        nextStory()
                    }, 5000)
                    return
                }} alt=''/>
            }
            {type==='video' && 
            <>
                <video className='story-vid' 
                src={storyData && storyData?.stories[innerIndex]?.url} 
                autoPlay 
                controls 
                controlsList="nodownload" 
                onEnded={nextStory}/>
            </>}
            <button className='nextBtn' onClick={nextStory}></button>
            <button className='prevBtn' onClick={prevStory}></button>
            <div className='story-count-bars'>
                {storyData?.stories && storyData.stories.map(story => 
                <div className='story-count-bar' key={story.storyID}>
                    {type==='image' && <div className={story.storyID===storyData?.stories[innerIndex]?.storyID ? 'load-bar' : 'bar'}></div>}
                    {type==='video' && <div className={story.storyID===storyData?.stories[innerIndex]?.storyID ? 'bar bar-vid' : 'bar'}></div>}
                </div>)}
            </div> 
        </div>
    )
}

export default StoryMediaBox
