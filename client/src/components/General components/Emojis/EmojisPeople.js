import React, {memo} from 'react'

const EmojisPeople = ({emojiCB, setRecentEmojis}) => {
    const emojis = e1+e2+e3+e4+e5
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

const e1 = '😀 😃 😄 😁 😆 😅 😂 🤣 😇 😉 😊 🙂 🙃 😋 😌 😍 🥰 😘 😗 😙 🤥 😳 😞 😟 😠 😡 🤬 😔 😕 🙁 😬 🥺 😣 😖 😫 😩 🥱 😤 😮 😱 😨 😰 😚 🤪 😜' 
const e2 = ' 😝 😛 🤑 😎 🤓 🧐 🤠 🥳 🤗 🤡 😏 😶 😐 😑 😒 🙄 🤨 🤔 🤫 🤭 😯 😦 😧 😢 😥 😪 🤤 😓 😭 🤩 😵 🥴 😲 🤯 🤐 😷 🤕 🤒 🤮 🤢 🤧 🥵 🥶 😴 💤' 
const e3 = ' 😈 👿 👹 👺 💩 👻 💀 ☠ 👽 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🤲 🙌 👏 🙏 🤝 👍 👎 👊 ✊ 🤛 🤜 🤞 ✌ 🤘 🤟 👌 🤌 🤏 👈 👉 👆 👇 ☝ ✋ 🤚 🖐 🖖 👋 🤙 💪 🦾 🖕'
const e4 = ' 💚 💙 💜 🤎 🖤 🤍 💔 ❣ 💕 💞 💓 💗 💖 💘 💝 ❤️ 💟 💃 🕺 👫 💏 👨 ❤ 🧡 💛' 
const e5 = ' 🦿 🦶 👄 🦷 👅 👂 🦻 👃 👁 👀 🧠 🦴 👤 👥 🗣 👶 👧 🧒 👦 👩 🧑 👨 👵 🧓 👴 👲 👳 🧕 👼 👸 🤴 👰 🤵 🙇' 

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