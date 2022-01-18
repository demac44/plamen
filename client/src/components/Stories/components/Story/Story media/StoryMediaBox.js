import React, {useState, useEffect, memo} from 'react'
import { useSelector } from 'react-redux';

const StoryMediaBox = (props) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [url, setUrl] = useState(null)
    const [loadBar, setLoadBar] = useState(false)
    const [timeout, setTimeoutt] = useState(null)
    
    const nextStory = () => {
        window.clearTimeout(timeout)
        if(props.storyData){
            if(props.index===(props.isProfile ? 0 : props.allDataLength-1) && props.innerIndex===props.storyData?.stories?.length-1){
                props.closeStoryCallback(false)
                return
            } else if (props.innerIndex===props.storyData?.stories?.length-1){
                props.setIndexCallback(props.index+1)
                props.setInnerIndexCallback(0)
                return
            } else { props.setInnerIndexCallback(props.innerIndex+1); return} 
        }
        return
    } 
    
    const prevStory = () => {
        window.clearTimeout(timeout)
        if(props.storyData){
            if(props.index===0 && props.innerIndex===0){ 
                props.closeStoryCallback(false)
                return null
            } else if (props.index>0 && props.innerIndex===0){ 
                props.setIndexCallback(props.index-1)
                props.setInnerIndexCallback(0)
                return null
            } else if (props.index>=0 && props.innerIndex>0){ 
                props.setInnerIndexCallback(props.innerIndex-1)
                return null
            }
        }
        return null
    }

    useEffect(()=>{
        props.storyData?.stories && setUrl(props.storyData && props.storyData?.stories[props.innerIndex]?.url)
        return
    }, [props.storyData, props.innerIndex])

    return (
        <div className='story-media flex-ctr'>
            {props.type==='image' && 
                (!url ? <div className='small-spinner'></div> : 
                <img src={url} onLoad={()=>{
                    if(!props.isProfile || (props.isProfile && uid!==props.userID)){ // no timeout if current users profile
                        setLoadBar(true) 
                        setTimeoutt(setTimeout(()=> {nextStory()}, 5000))
                    }
                }} alt=''/>)
            }
            {props.type==='video' && 
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
                {props.storyData?.stories && props.storyData.stories.map(story => 
                    <div className='story-count-bar' key={story.storyID}>

                        {/* no timeout if on current users profile */}
                        {(!props.isProfile || (props.isProfile && uid!==props.userID)) && 
                            <>
                                {/* if type is video no animation on bars */}
                                {(url && props.type==='image' && loadBar) && <div className={story.storyID===props.storyData?.stories[props.innerIndex]?.storyID ? 'load-bar' : 'load-bar-full'}></div>}
                                {(url && props.type==='video' && loadBar) && <div className={story.storyID===props.storyData?.stories[props.innerIndex]?.storyID ? 'load-bar-full bar-vid' : 'load-bar-full'}></div>}
                            </>
                        }
                    </div>)}
            </div>
        </div>
    )
}

export default memo(StoryMediaBox)
