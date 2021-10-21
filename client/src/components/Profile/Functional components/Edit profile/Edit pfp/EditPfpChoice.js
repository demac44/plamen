import React from 'react'

import '../../../../../App.css'
import '../../../../../General.css'

const EditPfpChoice = () => {
    return (
        <div className='edit-pfp-container flex-ctr'>
            <div className='edit-pfp-menu'>
                <ul>
                    <li>Change profile picture</li>
                    <li>Remove profile picture</li>
                    <li>Cancel</li>
                </ul>
            </div>
        </div>
    )
}

export default EditPfpChoice
