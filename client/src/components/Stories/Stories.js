import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import AddStory from './components/AddStory'
import StoryHead from './components/StoryHead'

import './Stories.css'

const Stories = ({stories, refetch}) => {
    const [width, setWidth] = useState(0)
    const [margin, setMargin] = useState(0)
    let index = 0 

    useEffect(()=>{
        if(stories){
            // each story head is 64px wide
            setWidth(stories?.length*64)
        }
    }, [stories])


    return (
        <div className="container-stories">
            <div className='inner-container-stories' style={{marginLeft:-margin.toString()+'%'}}>
                <div className='flex-col-ctr'>
                    <AddStory refetch={refetch}/>
                    <p style={{fontSize:'14px',color:'white'}}>Add story</p>
                </div>
                {stories.map(story => (
                    <div className='flex-col-ctr' style={{marginLeft:'10px'}}  key={story?.storyID}>
                        <StoryHead story={story} allData={stories} index={index++}/>
                        <p style={{fontSize:'14px', color:'white', marginTop:'8px'}}>{story?.username}</p>
                    </div>
                ))}
            </div>
            {/* stories buttons */}
            {margin > 0 && 
                <div 
                    className='flex-ctr' 
                    onClick={()=>setMargin(margin > 0 ? margin-100 : 0)}
                    style={{...styles.btn, left:'0'}}
                    >
                    <i className="fas fa-chevron-left"></i>
                </div>}
            <div 
                className='flex-ctr' 
                onClick={()=>setMargin(margin+100 > width ? margin :margin+100)}
                style={{...styles.btn, right:'0'}}
                >
                <FontAwesomeIcon icon='chevron-right'/>
            </div>
        </div>
    )
}

export default Stories


const styles = {
    btn:{
        position: 'absolute',
        top:'0',
        height: '100%',
        backgroundColor: '#1b1b1b',
        width: '30px',
        color: 'white',
        fontSize: '25px',
        cursor: 'pointer'
    }
}