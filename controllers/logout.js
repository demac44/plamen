import express from 'express'
import auth from '../middleware/auth.js'

const router = express.Router()


router.post('/', auth, (req, res) => {
    res.clearCookie("x-auth-token")
    res.send('del')
})



export default router