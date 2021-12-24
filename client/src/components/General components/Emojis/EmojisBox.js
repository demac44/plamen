import React, { useState } from 'react'
import EmojiAnimals from './EmojiAnimals'
import EmojisActivities from './EmojisActivities'
import EmojisFood from './EmojisFood'
import EmojisPeople from './EmojisPeople'
import EmojisPlaces from './EmojisPlaces'
import EmojisSymbols from './EmojisSymbols'

const EmojisBox = ({emojiCB}) => {
    return (
        <div className='emojis-box'>
            <EmojisPeople emojiCB={emojiCB}/>
            <EmojiAnimals emojiCB={emojiCB}/>
            <EmojisFood emojiCB={emojiCB}/>
            <EmojisActivities emojiCB={emojiCB}/>
            <EmojisPlaces emojiCB={emojiCB}/>
            <EmojisSymbols emojiCB={emojiCB}/>
        </div>
    )
}

export default EmojisBox

