import React, { memo, useCallback, useEffect, useState } from 'react'
import EmojisRecent from './EmojisRecent'
import './style.css'

import axios from 'axios'

const EmojisBox = ({emojiCB, visible}) => {
    const [emojis, setEmojis] = useState([])

    const setRecentEmojis = useCallback(val => {
        const lsEmojis = JSON.parse(localStorage.getItem('recent-emojis'))
        if(!lsEmojis?.emojis){
            localStorage.setItem('recent-emojis', JSON.stringify({emojis: [val]}))
        } else {
            localStorage.setItem('recent-emojis', JSON.stringify({emojis: [val, ...lsEmojis.emojis].filter(onlyUnique)}))
        }
    }, [])

    const func = async () => {
        await axios.get("http://localhost:8000/api/emojis").then(res=>setEmojis(res?.data?.data)).catch(err => console.log(err))
    }

    useEffect(()=>{
        func()
    }, [])

    return (
        <div className='emojis-box' style={{visibility: visible ? 'visible' : 'hidden'}}>
            <EmojisRecent emojiCB={emojiCB} setRecentEmojis={setRecentEmojis}/>
            <p className='emojis-title'>Emojis</p>
            <div className='emojis-sub-box'> 
                {emojis.map(emoji => <p key={emoji.e} onClick={()=>{emojiCB(emoji.e);setRecentEmojis(emoji.e)}}>{emoji.e}</p>)}
            </div>
        </div>
    )
}

export default memo(EmojisBox)

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}