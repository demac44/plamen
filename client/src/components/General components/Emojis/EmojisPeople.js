import React from 'react'

const EmojisPeople = ({emojiCB}) => {
    const emojis = e1+e2+e3+e4+e5

    return (
        <div className='emojis-sub-box'>
            {emojis.split(' ').map(em => <p onClick={()=>emojiCB(em)} key={Math.random()}>{em}</p>)}
        </div>
    )
}

export default EmojisPeople

const e1 = '😀 😃 😄 😁 😆 😅 😂 🤣 😇 😉 😊 🙂 🙃 😋 😌 😍 🥰 😘 😗 😙 🤥 😳 😞 😟 😠 😡 🤬 😔 😕 🙁 😬 🥺 😣 😖 😫 😩 🥱 😤 😮 😱 😨 😰 😚 🤪 😜' 
const e2 = ' 😝 😛 🤑 😎 🤓 🧐 🤠 🥳 🤗 🤡 😏 😶 😐 😑 😒 🙄 🤨 🤔 🤫 🤭 😯 😦 😧 😢 😥 😪 🤤 😓 😭 🤩 😵 🥴 😲 🤯 🤐 😷 🤕 🤒 🤮 🤢 🤧 🥵 🥶 😴 💤' 
const e3 = ' 😈 👿 👹 👺 💩 👻 💀 ☠ 👽 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🤲 🙌 👏 🙏 🤝 👍 👎 👊 ✊ 🤛 🤜 🤞 ✌ 🤘 🤟 👌 🤌 🤏 👈 👉 👆 👇 ☝ ✋ 🤚 🖐 🖖 👋 🤙 💪 🦾 🖕'
const e4 = ' 💚 💙 💜 🤎 🖤 🤍 💔 ❣ 💕 💞 💓 💗 💖 💘 💝 ❤️ 💟 💃 🕺 👫 💏 👨 ❤ 🧡 💛' 
const e5 = ' 🦿 🦶 👄 🦷 👅 👂 🦻 👃 👁 👀 🧠 🦴 👤 👥 🗣 👶 👧 🧒 👦 👩 🧑 👨 👵 🧓 👴 👲 👳 🧕 👼 👸 🤴 👰 🤵 🙇' 
