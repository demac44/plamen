import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddStoryBtn from './AddStoryBtn'
import {Link} from 'react-router-dom'

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

            <Link to='/settings'>
                <FontAwesomeIcon 
                    icon='cog'
                    size='lg' 
                    color='#aaa' 
                    onClick={()=>setPfpMenu(true)} cursor='pointer'
                    className='pf-sett-icon'/>
            </Link>
        </span>
    )
}

export default AddMediaBtnPf
