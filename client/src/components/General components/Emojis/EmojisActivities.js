import React from 'react'

const EmojisActivities = ({emojiCB}) => {
    return (
        <div className='emojis-sub-box'>
            {emojis.split(' ').map(em => <p onClick={()=>emojiCB(em)} key={Math.random()}>{em}</p>)}
        </div>
    )
}

export default EmojisActivities

const emojis = '⚽ 🏀 🏈 ⚾ 🥎 🎾 🏐 🏉 🎱 🥏 🏓 🏸 🥅 🏒 🏑 🏏 🥍 🥌 ⛳ 🏹 🎣 🤿 🥊 🥋 ⛸ 🎿 🛷 ⛷ 🏂 🏋️‍♀️ 🏋 🏋️‍♂️ 🤺 🤼‍♀️ 🤼 🤼‍♂️ 🤸‍♀️ 🤸 🤸‍♂️ ⛹️‍♀️ ⛹ ⛹️‍♂️ 🤾‍♀️ 🤾 🤾‍♂️ 🧗‍♀️ 🧗 🧗‍♂️ 🏌️‍♀️ 🏌 🏌️‍♂️ 🧘‍♀️ 🧘 🧘‍♂️ 🧖‍♀️ 🧖 🧖‍♂️ 🏄‍♀️ 🏄 🏄‍♂️ 🏊‍♀️ 🏊 🏊‍♂️ 🤽‍♀️ 🤽 🤽‍♂️ 🚣‍♀️ 🚣 🚣‍♂️ 🏇 🚴‍♀️ 🚴 🚴‍♂️ 🚵‍♀️ 🚵 🚵‍♂️ 🎽 🎖 🏅 🥇 🥈 🥉 🏆 🏵 🎗 🎫 🎟 🎪 🤹‍♀️ 🤹 🤹‍♂️ 🎭 🎨 🎬 🎤 🎧 🎼 🎹 🥁 🎷 🎺 🎸 🪕 🎻 🎲 🧩 ♟ 🎯 🎳 🪀 🪁 🎮 👾 🎰 👮 👮 👮 👷 👷 👷 💂 💂 💂 🕵 🤶 🎅 🦸 🦸 🦹 🧙 🧙 🧙 🧝 🧝 🧝 🧚 🧞 🧞 🧜 🧛 🧛 🧛 🧟 🧟 👪 '