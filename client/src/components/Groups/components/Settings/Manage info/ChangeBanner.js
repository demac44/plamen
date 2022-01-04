import React, { useCallback, useState } from 'react'
import ChangeBannerMenu from './ChangeBannerMenu'

const ChangeBanner = ({groupID, banner, refetch}) => {
    const [menu, setMenu] = useState(false)

    const closeMenu = useCallback(()=> {
        setMenu(false)
    }, [setMenu])

    return (
        <>
        <div className='box flex-col-ctr'>
            <p className='flex-ctr'>Change banner</p>
            <span className='flex-ctr change-banner-box'>
                <img src={banner} className='change_banner-curr-img' alt=''/>
                <button onClick={()=>setMenu(true)} className='btn'>CHANGE</button>
            </span>
        </div>
        {menu && <ChangeBannerMenu groupID={groupID} closeMenu={closeMenu} refetch={refetch}/>}
        </>
    )
}

export default ChangeBanner
