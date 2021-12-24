import React from 'react'

const EmojiFlags = ({emojiCB}) => {
    return (
        <div className='emojis-sub-box'> 
            {emojis.split(' ').map(em => <p onClick={()=>emojiCB(em)} key={Math.random()}>{em}</p>)}
        </div>
    )
}

export default EmojiFlags


const emojis = '🐶 🐱 🐭 🐹 🐰 🐻 🧸 🐼 🐻 🐨 🐯 🦁 🐮 🐷 🐽 🐸 🐵 🙈 🙉 🙊 🐒 🦍 🦧 🐔 🐧 🐦 🐤 🐣 🐥 🐺 🦊 🦝 🐗 🐴 🦓 🦒 🦌 🦘 🦥 🦦 🦄 🐝 🐛 🦋 🐌 🐞 🐜 🦗 🕷 🕸 🦂 🦟 🦠 🐢 🐍 🦎 🐙 🦑 🦞 🦀 🦐 🦪 🐠 🐟 🐡 🐬 🦈 🐳 🐋 🐊 🐆 🐅 🐃 🐂 🐄 🐪 🐫 🦙 🐘 🦏 🦛 🐐 🐏 🐑 🐎 🐖 🦇 🐓 🦃 🕊 🦅 🦆 🦢 🦉 🦩 🦚 🦜 🐕 🦮 🐕 🐩 🐈 🐈 🐇 🐀 🐁 🐿 🦨 🦡 🦔 🐾 🐉 🐲 🦕 🦖 🌵 🎄 🌲 🌳 🌴 🌱 🌿 ☘ 🍀 🎍 🎋 🍃 🍂 🍁 🌾 🌺 🌻 🌹 🥀 🌷 🌼 🌸 💐 🍄 🌰 🐚 🌎 🌍 🌏 🌕 🌖 🌗 🌘 🌑 🌒 🌓 🌔 🌙 🌚 🌝 🌛 🌜 ⭐ 🌟 💫 ✨ ☄ 🪐 🌞 ☀ 🌤 ⛅ 🌥 🌦 ☁ 🌧 ⛈ 🌩 ⚡ 🔥 💥 ❄ 🌨 ☃ ⛄ 🌬 💨 🌪 🌫 🌈 ☔ 💧 💦 🌊'