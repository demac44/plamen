import React, { useEffect, useState } from 'react'
import StoryBar from '../components/StoryBar'

const Story = ({data, i, closeStoryCallback, info}) => {
    const [storyData, setStoryData] = useState([])
    const [index, setIndex] = useState(i)
    const [innerIndex, setInnerIndex] = useState(0)

    useEffect(()=>{
        setStoryData(data?.get_stories[index])
    }, [data, index, innerIndex])
    
    const nextStory = () => {
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
            <StoryBar user={{
                first_name: storyData?.first_name, 
                last_name: storyData?.last_name,
                profile_picture: storyData?.profile_picture
                }} date={storyData.stories && storyData?.stories[innerIndex]?.date_posted}/>
            <div className='story-media flex-ctr'>
                {storyData?.stories && (storyData?.stories[innerIndex]?.type==='image' && 
                    <img src={storyData?.stories[innerIndex]?.url}/>)
                }
                {storyData?.stories && (storyData?.stories[innerIndex]?.type==='video' && 
                    <video src={storyData?.stories[innerIndex]?.url} autoPlay/>)
                }
                <button className='nextBtn' onClick={nextStory}></button>
                <button className='prevBtn' onClick={prevStory}></button>
            </div>
            <form className='story-bottom-wrap'>
                <input type='text' style={styles.msgInput} placeholder='Reply to story...'/>
                <button className='btn' style={styles.btn}>SEND</button>
            </form>
        </div>
    )
}

export default Story

const styles = {
    msgInput:{
        width:'100%',
        height:'100%',
        backgroundColor:'#111827',
        color:'white',
        border:'none',
        outline:'none'
    },
    btn:{
        padding:'5px 10px'
    }
}