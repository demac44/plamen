import React from 'react'
import AddStoryBtn from './AddStoryBtn'
import {Link} from 'react-router-dom'

const AddMediaBtnPf = ({setPfpMenu, refetch}) => {
    return (
        <span>
            <AddStoryBtn refetch={refetch}/>

            <i 
                className='fas fa-camera pf-camera-icon' 
                size='lg' 
                style={{color:'#aaa'}} 
                onClick={()=>setPfpMenu(true)} cursor='pointer'
            />

            <Link to='/settings'>
                <i 
                    className='fas fa-cog pf-sett-icon'
                    size='lg' 
                    style={{color:'#aaa'}} 
                    onClick={()=>setPfpMenu(true)} cursor='pointer'/>
            </Link>
        </span>
    )
}

export default AddMediaBtnPf
