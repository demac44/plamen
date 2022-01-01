import React, { memo, useCallback } from 'react'
import emojis from '../../../Assets/emojis'
import EmojiAnimals from './EmojiAnimals'
import EmojisActivities from './EmojisActivities'
import EmojisFood from './EmojisFood'
import EmojisPeople from './EmojisPeople'
import EmojisPlaces from './EmojisPlaces'
import EmojisRecent from './EmojisRecent'
import EmojisSymbols from './EmojisSymbols'
import './style.css'

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
            <EmojisPeople emojiCB={emojiCB} setRecentEmojis={setRecentEmojis} emojis={emojis.emojisPeople}/>
            <EmojiAnimals emojiCB={emojiCB} setRecentEmojis={setRecentEmojis} emojis={emojis.emojisAnimals}/>
            <EmojisFood emojiCB={emojiCB} setRecentEmojis={setRecentEmojis} emojis={emojis.emojisFood}/>
            <EmojisActivities emojiCB={emojiCB} setRecentEmojis={setRecentEmojis} emojis={emojis.emojisActivities}/>
            <EmojisPlaces emojiCB={emojiCB} setRecentEmojis={setRecentEmojis} emojis={emojis.emojisPlaces}/>
            <EmojisSymbols emojiCB={emojiCB} setRecentEmojis={setRecentEmojis} emojis={emojis.emojisSymbols}/>
        </div>
    )
}

export default memo(EmojisBox)

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}