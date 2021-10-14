const loggedReducer = (state=false, action) => {
    switch(action.type){
        case 'SIGNIN':
            return true
        case 'SIGNOUT':
            return false
        default:
            return true
    }
}


export default loggedReducer