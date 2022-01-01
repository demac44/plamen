import React, {memo} from 'react'
const EmojisFood = ({emojiCB, setRecentEmojis, emojis}) => {
    let i = 0;
    return (
        <div className='emojis-sub-box'>
            {emojis?.split(' ')?.map(em => <p onClick={()=>{emojiCB(em);setRecentEmojis(em)}} key={i++}>{em}</p>)}
        </div>
    )
}

export default memo(EmojisFood)
