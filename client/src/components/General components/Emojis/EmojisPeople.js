import React, {memo} from 'react'

import { emPeople1, emPeople2, emPeople3, emPeople4, emPeople5, } from '../../../Assets/emojis';

const EmojisPeople = ({emojiCB, setRecentEmojis}) => {
    const emojis = emPeople1+emPeople2+emPeople3+emPeople4+emPeople5
    let i = 0;

    return (
        <>
            <p style={styles.title}>Emojis</p>
            <div className='emojis-sub-box'>
                {emojis.split(' ').map(em => <p onClick={()=>{emojiCB(em);setRecentEmojis(em)}} key={i++}>{em}</p>)}
            </div>
        </>
    )
}

export default memo(EmojisPeople) 

const styles = {
    title: {
        color:'#aaa',
        fontSize:'16px',
        backgroundColor:'#1f1f1f',
        padding:'2px',
        marginBottom:'10px',
        marginTop:'5px'
    }
}