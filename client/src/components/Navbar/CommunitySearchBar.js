import React, {memo} from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../General components/Avatar'

const CommunitySearchBar = ({comm, dropdownCallback}) => {
    return (
        <Link to={'/community/'+comm.groupID} className='search-user-box' onClick={()=>dropdownCallback()}>
            <Avatar size='50px' image={comm.banner_image}/>
            <div style={{marginLeft:'15px'}}>
                <p>{comm.group_name}</p>
            </div>
        </Link> 
    )
}

export default memo(CommunitySearchBar)
