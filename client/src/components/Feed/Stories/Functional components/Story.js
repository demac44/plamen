import React, { useEffect, useState } from 'react'
import StoryBar from '../components/StoryBar'

const Story = ({data, i, closeStoryCallback}) => {
    let timeout;
    const [storyData, setStoryData] = useState([])
    const [index, setIndex] = useState(i)
    const [innerIndex, setInnerIndex] = useState(0)
    const [type, setType] = useState('')
    
    useEffect(()=>{
        setStoryData(data?.get_stories[index])
        storyData?.stories && setType(storyData.stories[innerIndex].type)
    }, [data, index, innerIndex, type, i, storyData?.stories])
    
    
    const nextStory = () => {
        clearTimeout(timeout)
        if(storyData?.stories){
            if(index===data?.get_stories?.length-1 && innerIndex===storyData?.stories?.length-1){
                closeStoryCallback()
                return
            } else if (innerIndex===storyData.stories.length-1){
                setInnerIndex(0)
                setIndex(index+1)
            } else setInnerIndex(innerIndex+1)
        }
    }
    
    const prevStory = () => {
        clearTimeout(timeout)
        if(storyData?.stories){
            if(index===0 && innerIndex===0){
                closeStoryCallback()
                return
            } else if (index>0 && innerIndex===0){
                setInnerIndex(data?.get_stories[index-1].stories.length-1)
                setIndex(index-1)
            } else if (index>=0 && innerIndex>0){
                setInnerIndex(innerIndex-1)
            }
        }
    }
    
    return (
        <div className='story-preview flex-col-ctr'>
            <div className='story-box'>
                <StoryBar user={{
                    first_name: storyData?.first_name, 
                    last_name: storyData?.last_name,
                    profile_picture: storyData?.profile_picture,
                    userID:storyData?.userID
                }} date={storyData?.stories && storyData?.stories[innerIndex]?.date_posted}
                    closeStoryCallback={closeStoryCallback}
                />

                    <div className='story-media flex-ctr'>
                        {type==='image' && 
                            <img src={storyData?.stories && storyData?.stories[innerIndex]?.url} onLoad={()=>{
                                timeout = setTimeout(()=>{
                                    nextStory()
                                }, 5000)
                                return
                            }}/>
                        }
                        {type==='video' && 
                        <>
                            <video className='story-vid' src={storyData?.stories && storyData?.stories[innerIndex]?.url} autoPlay controls controlsList="nodownload" onEnded={nextStory}/>
                        </>}
                        <button className='nextBtn' onClick={nextStory}></button>
                        <button className='prevBtn' onClick={prevStory}></button>
                        <div className='story-count'>
                            {storyData?.stories && storyData.stories.map(story => 
                            <div className='story-count-bar' key={story.storyID}>
                                {type==='image' && <div className={story.storyID===storyData?.stories[innerIndex]?.storyID ? 'load-bar' : 'bar'}></div>}
                                {type==='video' && <div className={story.storyID===storyData?.stories[innerIndex]?.storyID ? 'bar bar-vid' : 'bar'}></div>}
                            </div>)}
                        </div> 
                    </div>
                <form className='story-bottom-wrap'>
                    <input type='text' style={styles.msgInput} placeholder='Reply to story...'/>
                    <button className='btn' style={styles.btn}>SEND</button>
                </form>
            </div>
        </div>
    )
}

export default Story


    const styles = {
        msgInput:{
            width:'100%',
            height:'100%',
            backgroundColor:'black',
            color:'white',
            border:'none',
            outline:'none'
        },
        btn:{
            padding:'5px 10px'
        }
    }
