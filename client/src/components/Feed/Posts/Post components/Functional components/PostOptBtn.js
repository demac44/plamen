import React, { useState } from 'react'
import PostOptionsMenu from './PostOptionsMenu'

const PostOptBtn = ({id}) => {
    const [menu, setMenu] = useState(false)

    const handleDropdown = () =>{
        setMenu(!menu)
    }
    return (
        <>
            <i className="fas fa-ellipsis-v fp-options-btn" onClick={handleDropdown}></i>
            {menu && <PostOptionsMenu id={id}/>}
        </>
    )
}

export default PostOptBtn
