import React, { memo } from 'react'
import EmojiAnimals from './EmojiAnimals'
import EmojisActivities from './EmojisActivities'
import EmojisFood from './EmojisFood'
import EmojisPeople from './EmojisPeople'
import EmojisPlaces from './EmojisPlaces'
import EmojisSymbols from './EmojisSymbols'

const EmojisBox = ({emojiCB, visible}) => {
    return (
        <div className='emojis-box' style={{visibility: visible ? 'visible' : 'hidden'}}>
            <EmojisPeople emojiCB={emojiCB}/>
            <EmojiAnimals emojiCB={emojiCB}/>
            <EmojisFood emojiCB={emojiCB}/>
            <EmojisActivities emojiCB={emojiCB}/>
            <EmojisPlaces emojiCB={emojiCB}/>
            <EmojisSymbols emojiCB={emojiCB}/>
        </div>
    )
}

export default memo(EmojisBox)

