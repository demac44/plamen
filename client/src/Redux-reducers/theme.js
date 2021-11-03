const themeReducer = (state = false, action) => {
    switch(action.type){
        case 'YELLOW':
            return {payload: action.payload}
        case 'AQUA':
            return {payload: action.payload}
        default:
            return state
    }
}


export default themeReducer