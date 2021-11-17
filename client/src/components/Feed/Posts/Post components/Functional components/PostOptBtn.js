import React, { useCallback, useState } from 'react'
import PostOptionsMenu from './PostOptionsMenu'

const PostOptBtn = ({postID, callback, userID}) => {
    const [menu, setMenu] = useState(false)

    const menuCallback = useCallback(val => {
        setMenu(val)
    }, [setMenu])

    const handleDropdown = () =>{
        setMenu(!menu)
    }
    return (
        <>
            <i className="fas fa-ellipsis-v fp-options-btn" onClick={handleDropdown}></i>
            {menu && <PostOptionsMenu postID={postID} callback={callback} userID={userID} menuCallback={menuCallback}/>}
        </>
    )
}

export default PostOptBtn
