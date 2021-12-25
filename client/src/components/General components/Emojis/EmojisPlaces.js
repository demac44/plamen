import React, {memo} from 'react'

import { emojisPlaces as emojis } from '../../../Assets/emojis';

const EmojisPlaces = ({emojiCB, setRecentEmojis}) => {
    let i = 0;
    return (
        <div className='emojis-sub-box'>
            {emojis.split(' ').map(em => <p onClick={()=>{emojiCB(em);setRecentEmojis(em)}} key={i++}>{em}</p>)}
        </div>
    )
}

export default memo(EmojisPlaces)