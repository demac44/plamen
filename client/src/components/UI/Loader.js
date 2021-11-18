import React from 'react'

import '../../App.css'
import '../../General.css'


const Loader = ({size}) => {
    return (
        <div className='spinner-box flex-ctr'>
            <div className={size ? 'small-spinner' : 'spinner'}>
                <div className='inner-spinner' style={{display:size &&  'none'}}>

                </div>
            </div>
        </div>
    )
}

export default Loader
