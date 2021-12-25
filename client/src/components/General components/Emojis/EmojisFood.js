import React, {memo} from 'react'

import { emojisFood as emojis } from '../../../Assets/emojis';

const EmojisFood = ({emojiCB, setRecentEmojis}) => {
    let i = 0;
    return (
        <div className='emojis-sub-box'>
            {emojis.split(' ').map(em => <p onClick={()=>{emojiCB(em);setRecentEmojis(em)}} key={i++}>{em}</p>)}
        </div>
    )
}

export default memo(EmojisFood)
