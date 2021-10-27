import React from 'react'
import AddStory from './AddStory'
import Story from './Story'

const Stories = () => {
    return (
        <div className="stories-container">
            <AddStory/>
            <Story/>
        </div>
    )
}

export default Stories
