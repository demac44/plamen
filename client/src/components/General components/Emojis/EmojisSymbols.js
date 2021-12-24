import React, {memo} from 'react'

const EmojisSymbols = ({emojiCB, setRecentEmojis}) => {
    let i = 0;
    return (
        <div className='emojis-sub-box'>
            {emojis.split(' ').map(em => <p onClick={()=>{emojiCB(em);setRecentEmojis(em)}} key={i++}>{em}</p>)}
        </div>
    )
}

export default memo(EmojisSymbols)


const emojis = '☮ ✝ ☪ 🕉 ☸ ✡ 🔯 🕎 ☯ ☦ 🛐 ⛎ ♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓ 🆔 ⚛ ⚕ ☢ ☣ 📴 📳 🈶 🈚 🈸 🈺 🈷 ✴ 🆚 🉑 💮 🉐 ㊙ ㊗ 🈴 🈵 🈹 🈲 🅰 🅱 🆎 🆑 🅾 🆘 ⛔ 📛 🚫 ❌ ⭕ 💢 ♨ 🚷 🚯 🚳 🚱 🔞 📵 🚭 ❗ ❕ ❓ ❔ ‼ ⁉ 💯 🔅 🔆 🔱 ⚜ 〽 ⚠ 🚸 🔰 ♻ 🈯 💹 ❇ ✳ ❎ ✅ 💠 🌀 ➿ 🌐 ♾ Ⓜ 🏧 🚾 ♿ 🅿 🈳 🈂 🛂 🛃 🛄 🛅 🚰 🛗 🚹 ♂ 🚺 ♀ ⚧ 🚼 🚻 🚮 🎦 📶 🈁 🆖 🆗 🆙 🆒 🆕 🆓 0⃣ 1⃣ 2⃣ 3⃣ 4⃣ 5⃣ 6⃣ 7⃣ 8⃣ 9⃣ 🔟 🔢 ▶ ⏸ ⏯ ⏹ ⏺ ⏏ ⏭ ⏮ ⏩ ⏪ 🔀 🔁 🔂 ◀ 🔼 🔽 ⏫ ⏬ ➡ ⬅ ⬆ ⬇ ↗ ↘ ↙ ↖ ↕ ↔ 🔄 ↪ ↩ 🔃 ⤴ ⤵ #⃣ *⃣ ℹ 🔤 🔡 🔠 🔣 🎵 🎶 〰 ➰ ✔ ➕ ➖ ➗ ✖ 💲 💱 © ® ™ 🔚 🔙 🔛 🔝 🔜 ☑ 🔘 🔴 🟠 🟡 🟢 🔵 🟣 🟤 ⚫ ⚪ 🟥 🟧 🟨 🟩 🟦 🟪 🟫 ⬛ ⬜ ◼ ◻ ◾ ◽ ▪ ▫ 🔸 🔹 🔶 🔷 🔺 🔻 🔲 🔳 🔈 🔉 🔊 🔇 📣 📢 🔔 🔕 🃏 🀄 ♠ ♣ ♥ ♦ 🎴 👁‍🗨 🗨 💭 🗯 💬 🕐 🕑 🕒 🕓 🕔 🕕 🕖 🕗 🕘 🕙 🕚 🕛 🕜 🕝 🕞 🕟 🕠 🕡 🕢 🕣 🕤 🕥 🕦 🕧'