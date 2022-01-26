import express from 'express'
import jwt from 'jsonwebtoken'

const router = express.Router()


router.post('/', (req, res) => {
    const {token} = req.body
    try{
        if (!token) return res.status(403).send("Access denied.");
        else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            res.json({
                token,
                user: decoded
            })
        }
    } catch (error){
        res.status(400).send("Invalid token");
    }
})



export default router