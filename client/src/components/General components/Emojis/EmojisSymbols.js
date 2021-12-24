import React from 'react'

const EmojisSymbols = ({emojiCB}) => {
    return (
        <div className='emojis-sub-box'>
            {emojis.split(' ').map(em => <p onClick={()=>emojiCB(em)} key={Math.random()}>{em}</p>)}
        </div>
    )
}

export default EmojisSymbols


const emojis = '☮ ✝ ☪ 🕉 ☸ ✡ 🔯 🕎 ☯ ☦ 🛐 ⛎ ♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓ 🆔 ⚛ ⚕ ☢ ☣ 📴 📳 🈶 🈚 🈸 🈺 🈷 ✴ 🆚 🉑 💮 🉐 ㊙ ㊗ 🈴 🈵 🈹 🈲 🅰 🅱 🆎 🆑 🅾 🆘 ⛔ 📛 🚫 ❌ ⭕ 💢 ♨ 🚷 🚯 🚳 🚱 🔞 📵 🚭 ❗ ❕ ❓ ❔ ‼ ⁉ 💯 🔅 🔆 🔱 ⚜ 〽 ⚠ 🚸 🔰 ♻ 🈯 💹 ❇ ✳ ❎ ✅ 💠 🌀 ➿ 🌐 ♾ Ⓜ 🏧 🚾 ♿ 🅿 🈳 🈂 🛂 🛃 🛄 🛅 🚰 🛗 🚹 ♂ 🚺 ♀ ⚧ 🚼 🚻 🚮 🎦 📶 🈁 🆖 🆗 🆙 🆒 🆕 🆓 0⃣ 1⃣ 2⃣ 3⃣ 4⃣ 5⃣ 6⃣ 7⃣ 8⃣ 9⃣ 🔟 🔢 ▶ ⏸ ⏯ ⏹ ⏺ ⏏ ⏭ ⏮ ⏩ ⏪ 🔀 🔁 🔂 ◀ 🔼 🔽 ⏫ ⏬ ➡ ⬅ ⬆ ⬇ ↗ ↘ ↙ ↖ ↕ ↔ 🔄 ↪ ↩ 🔃 ⤴ ⤵ #⃣ *⃣ ℹ 🔤 🔡 🔠 🔣 🎵 🎶 〰 ➰ ✔ ➕ ➖ ➗ ✖ 💲 💱 © ® ™ 🔚 🔙 🔛 🔝 🔜 ☑ 🔘 🔴 🟠 🟡 🟢 🔵 🟣 🟤 ⚫ ⚪ 🟥 🟧 🟨 🟩 🟦 🟪 🟫 ⬛ ⬜ ◼ ◻ ◾ ◽ ▪ ▫ 🔸 🔹 🔶 🔷 🔺 🔻 🔲 🔳 🔈 🔉 🔊 🔇 📣 📢 🔔 🔕 🃏 🀄 ♠ ♣ ♥ ♦ 🎴 👁‍🗨 🗨 💭 🗯 💬 🕐 🕑 🕒 🕓 🕔 🕕 🕖 🕗 🕘 🕙 🕚 🕛 🕜 🕝 🕞 🕟 🕠 🕡 🕢 🕣 🕤 🕥 🕦 🕧'