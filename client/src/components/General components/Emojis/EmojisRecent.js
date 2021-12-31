import React from 'react'

const EmojisRecent = ({emojiCB, setRecentEmojis}) => {
    const lsEmojis = JSON.parse(localStorage.getItem('recent-emojis'))
    let i = 0;
    return (
        <>
        {lsEmojis?.emojis.length>0 && 
            <>
                <p className='emojis-title'>Recently used</p>
                <div className='emojis-sub-box'>
                    {lsEmojis?.emojis?.slice(0,20).map(em => <p onClick={()=>{emojiCB(em);setRecentEmojis(em)}} key={i++}>{em}</p>)}
                </div>
            </>}
        </>
    )
}

export default EmojisRecent