import React from 'react'

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
