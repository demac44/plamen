import React, {memo} from 'react'
const TagsBox = ({tags}) => {
    return (
        <div className='tags-box'>
            {tags.map(tag => <div
                className='tag'
                key={tag}
            >{tag}</div>)}
        </div>
    )
}
export default memo(TagsBox)