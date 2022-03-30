import axios from "axios"
import jwt from "jsonwebtoken"

export const authenticate = () => {
    const token = getCookie()
    let isAuth = false
    let user = {}
    if(token){
        jwt.verify(token, process.env.REACT_APP_JWT_SECRET, (err, res) =>{
            if (err) {
                logout()
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

function getCookie() {
    const cookie = document?.cookie?.split('; ')?.find(row => row.startsWith('x-auth-token='))?.split('=')[1];
    return cookie
}
const logout = async () => {
    await axios({
        method:'post',
        url:'/api/logout',
        withCredentials: true
    }).then(()=>{
        localStorage.clear()
        window.location.href = '/login'
    })
}
  