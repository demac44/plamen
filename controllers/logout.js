import express from 'express'

const router = express.Router()


router.post('/', (req, res) => {
    res.clearCookie("x-auth-token")
    res.sendStatus(200)
})



export default router