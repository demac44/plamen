import React, {memo} from 'react'

const EmojisPlaces = ({emojiCB}) => {
    let i = 0;
    return (
        <div className='emojis-sub-box'>
            {emojis.split(' ').map(em => <p onClick={()=>emojiCB(em)} key={i++}>{em}</p>)}
        </div>
    )
}

export default memo(EmojisPlaces)


const emojis = '🚗 🚙 🚕 🛺 🚌 🚎 🏎 🚓 🚑 🚒 🚐 🚚 🚛 🚜 🏍 🛵 🚲 🦼 🦽 🛴 🛹 🛼 🚨 🚔 🚍 🚘 🚖 🚡 🚠 🚟 🚃 🚋 🚝 🚄 🚅 🚈 🚞 🚂 🚆 🚇 🚊 🚉 🚁 🛩 ✈ 🛫 🛬 🪂 💺 🛰 🚀 🛸 🛶 ⛵ 🛥 🚤 ⛴ 🛳 🚢 ⚓ ⛽ 🚧 🚏 🚦 🚥 🛑 🎡 🎢 🎠 🏗 🌁 🗼 🏭 ⛲ 🎑 ⛰ 🏔 🗻 🌋 🗾 🏕 ⛺ 🏞 🛣 🛤 🌅 🌄 🏜 🏖 🏝 🌇 🌆 🏙 🌃 🌉 🌌 🌠 🎇 🎆 🏘 🏰 🏯 🏟 🗽 🏠 🏡 🏚 🏢 🏬 🏣 🏤 🏥 🏦 🏨 🏪 🏫 🏩 💒 🏛 ⛪ 🕌 🛕 🕍 🕋 ⛩'