import jwt from "jsonwebtoken"

export const authenticate = () => {
    const token = localStorage.getItem("token")
    let isAuth = false
    let user = {}
    if(token){
        jwt.verify(token, process.env.REACT_APP_JWT_SECRET, (err, res) =>{
            if (err) {
                localStorage.removeItem('token')
                isAuth = false
            }
            else {
                isAuth = true
                user = res
            }
        })
    }
    if (isAuth) return {type: 'AUTH', payload: user }
    else return {type: 'NOTAUTH', payload: user}


}