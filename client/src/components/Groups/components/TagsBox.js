import React, {memo} from 'react'

const TagsBox = ({tags}) => {
    return (
        <div className='tags-box'>
            {tags.map(tag => <div
                style={styles.tag}
                key={tag}
            >{tag}</div>)}
        </div>
    )
}

export default memo(TagsBox)

const styles = {
    tag:{
        padding:'5px 10px',
        backgroundColor:'teal',
        fontSize:'14px',
        color:'white',
        height:'fit-content',
        borderRadius:'20px',
        marginTop:'5px',
        marginLeft:'5px'
    }
}