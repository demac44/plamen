import React from 'react'

import TagsBox from '../../Groups/components/TagsBox'

const InterestsBox = ({myprofile}) => {
    return (
        <div className='profile-interests-box'>
            <div style={styles.title} className='flex-sb'>
                <h3>My interests</h3>
                {myprofile && <p style={styles.editBtn}>Edit</p>}
            </div>
            <TagsBox tags={['Programming', 'Computers', 'Hanging out']}/>                        
        </div>
    )
}

export default InterestsBox


const styles = {
    title:{
        padding:'5px'
    },
    editBtn:{
        padding:'5px 15px',
        backgroundColor:'#2f2f2f',
        borderRadius:'10px',
        fontSize:'14px',
        cursor:'pointer'
    }
}