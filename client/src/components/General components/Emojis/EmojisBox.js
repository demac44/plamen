import React, { memo, useCallback } from 'react'
import EmojiAnimals from './EmojiAnimals'
import EmojisActivities from './EmojisActivities'
import EmojisFood from './EmojisFood'
import EmojisPeople from './EmojisPeople'
import EmojisPlaces from './EmojisPlaces'
import EmojisRecent from './EmojisRecent'
import EmojisSymbols from './EmojisSymbols'

const EmojisBox = ({emojiCB, visible}) => {

    const setRecentEmojis = useCallback(val => {
        const lsEmojis = JSON.parse(localStorage.getItem('recent-emojis'))
        if(!lsEmojis?.emojis){
            localStorage.setItem('recent-emojis', JSON.stringify({emojis: [val]}))
        } else {
            localStorage.setItem('recent-emojis', JSON.stringify({emojis: [val, ...lsEmojis.emojis].filter(onlyUnique)}))
        }
    }, [])

    return (
        <div className='emojis-box' style={{visibility: visible ? 'visible' : 'hidden'}}>
            <EmojisRecent emojiCB={emojiCB} setRecentEmojis={setRecentEmojis}/>
            <EmojisPeople emojiCB={emojiCB} setRecentEmojis={setRecentEmojis}/>
            <EmojiAnimals emojiCB={emojiCB} setRecentEmojis={setRecentEmojis}/>
            <EmojisFood emojiCB={emojiCB} setRecentEmojis={setRecentEmojis}/>
            <EmojisActivities emojiCB={emojiCB} setRecentEmojis={setRecentEmojis}/>
            <EmojisPlaces emojiCB={emojiCB} setRecentEmojis={setRecentEmojis}/>
            <EmojisSymbols emojiCB={emojiCB} setRecentEmojis={setRecentEmojis}/>
        </div>
    )
}

export default memo(EmojisBox)

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}