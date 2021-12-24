import React, {memo} from 'react'

const EmojisPeople = ({emojiCB}) => {
    const emojis = e1+e2+e3+e4+e5
    let i = 0;

    return (
        <div className='emojis-sub-box'>
            {emojis.split(' ').map(em => <p onClick={()=>emojiCB(em)} key={i++}>{em}</p>)}
        </div>
    )
}

export default memo(EmojisPeople)

const e1 = '😀 😃 😄 😁 😆 😅 😂 🤣 😇 😉 😊 🙂 🙃 😋 😌 😍 🥰 😘 😗 😙 🤥 😳 😞 😟 😠 😡 🤬 😔 😕 🙁 😬 🥺 😣 😖 😫 😩 🥱 😤 😮 😱 😨 😰 😚 🤪 😜' 
const e2 = ' 😝 😛 🤑 😎 🤓 🧐 🤠 🥳 🤗 🤡 😏 😶 😐 😑 😒 🙄 🤨 🤔 🤫 🤭 😯 😦 😧 😢 😥 😪 🤤 😓 😭 🤩 😵 🥴 😲 🤯 🤐 😷 🤕 🤒 🤮 🤢 🤧 🥵 🥶 😴 💤' 
const e3 = ' 😈 👿 👹 👺 💩 👻 💀 ☠ 👽 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🤲 🙌 👏 🙏 🤝 👍 👎 👊 ✊ 🤛 🤜 🤞 ✌ 🤘 🤟 👌 🤌 🤏 👈 👉 👆 👇 ☝ ✋ 🤚 🖐 🖖 👋 🤙 💪 🦾 🖕'
const e4 = ' 💚 💙 💜 🤎 🖤 🤍 💔 ❣ 💕 💞 💓 💗 💖 💘 💝 ❤️ 💟 💃 🕺 👫 💏 👨 ❤ 🧡 💛' 
const e5 = ' 🦿 🦶 👄 🦷 👅 👂 🦻 👃 👁 👀 🧠 🦴 👤 👥 🗣 👶 👧 🧒 👦 👩 🧑 👨 👵 🧓 👴 👲 👳 🧕 👼 👸 🤴 👰 🤵 🙇' 
