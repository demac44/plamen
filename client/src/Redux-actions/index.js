import jwt from "jsonwebtoken"

export const signin = () => {
    const token = localStorage.getItem('token')
    let isUser = false

    if(token) {
        const user = jwt.decode(token)
        if(!user){
            localStorage.removeItem('token')
            isUser = false
        } else isUser = true
    } else isUser = false

    if(isUser) return{type: 'SIGNIN'}
    else return{type:'SIGNOUT'}
}
