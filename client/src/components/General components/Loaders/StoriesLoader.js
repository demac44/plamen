import React from 'react'
import './style.css'
const StoriesLoader = () => {
    const num = [1,1,1,1,1,1,1,1]
    return (
        <div className='container-stories'>
            <div className='inner-container-stories'>
                {num.map(()=>
                <div className='flex-col-ctr' key={Math.random()}>
                    <div className='story-head-loader'></div>  
                    <div className='story-name-bar-loader'></div>        
                </div>)}
            </div>
        </div>
    )
}
export default StoriesLoader