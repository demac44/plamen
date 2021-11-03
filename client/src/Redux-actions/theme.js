

const yellow = {
    border: '1px solid #ffbb00',
    color: '#ffbb00',
    background: 'linear-gradient(to right, ##ffd900, #ff5100)'
}

const aqua = {
    border: '1px solid blue',
    color: 'white',
    background: 'linear-gradient(to right, black, blue)'
}


export const set_theme = () => {
    const ls = JSON.parse(localStorage.getItem('theme'))
    return {type: theme, payload: theme==='AQUA' ? aqua : yellow }
}
