import React, {memo} from 'react'

import { emPeople1, emPeople2, emPeople3, emPeople4, emPeople5, } from '../../../Assets/emojis';

const EmojisPeople = ({emojiCB, setRecentEmojis}) => {
    const emojis = emPeople1+emPeople2+emPeople3+emPeople4+emPeople5
    let i = 0;

    return (
        <>
            <p className='emojis-title'>Emojis</p>
            <div className='emojis-sub-box'>
                {emojis.split(' ').map(em => <p onClick={()=>{emojiCB(em);setRecentEmojis(em)}} key={i++}>{em}</p>)}
            </div>
        </>
    )
}

export default memo(EmojisPeople) 