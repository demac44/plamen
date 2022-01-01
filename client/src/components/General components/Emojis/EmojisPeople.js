import React, {memo} from 'react'
const EmojisPeople = ({emojiCB, setRecentEmojis, emojis}) => {
    let i = 0;

    return (
        <>
            <p className='emojis-title'>Emojis</p>
            <div className='emojis-sub-box'>
                {emojis?.split(' ')?.map(em => <p onClick={()=>{emojiCB(em);setRecentEmojis(em)}} key={i++}>{em}</p>)}
            </div>
        </>
    )
}

export default memo(EmojisPeople) 