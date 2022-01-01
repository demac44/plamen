import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddStoryBtn from './AddStoryBtn'

const AddMediaBtnPf = ({setPfpMenu, refetch}) => {
    return (
        <span>
            <AddStoryBtn refetch={refetch}/>

            <FontAwesomeIcon 
                icon='camera' 
                size='lg' 
                color='#aaa' 
                onClick={()=>setPfpMenu(true)} cursor='pointer'
                className='pf-camera-icon'
            />
        </span>
    )
}

export default AddMediaBtnPf
