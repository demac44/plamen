const authReducer = (state=false, action) => {
    switch(action.type){
        case 'AUTH':
            return {isAuth: true, user: action.payload}
        case 'NOTAUTH':
            return {isAuth: false}
        default:
            return {isAuth: false}
        }
}


export default authReducer