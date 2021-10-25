import express from 'express'
import bcrypt from 'bcrypt'
import connection from '../middleware/db.js'
import jwt from 'jsonwebtoken'

const router = express.Router()


router.post('/', async (req, res) => {
    const {username, password} = req.body
    let sql = `SELECT * FROM users WHERE username="${username}" OR email="${username}"` 
    let result = await connection.query(sql)
    if (result.length === 0) {
        res.send({error: 'User not found'})
    } else {
        const userID = result[0].userID
        const hashedPass = result[0].pass
        const obj = {
            userID: userID,
            first_name: result[0].first_name,
            last_name: result[0].last_name,
            username: result[0].username,
            profile_picture: result[0].profile_picture,
            currentUser: true
        }
        bcrypt.compare(password, hashedPass).then(response => {
            if (!response) {
                res.send({error: 'Incorrect password!'})
            } else {
                const token = jwt.sign({userID: userID, username: username}, process.env.JWT_SECRET) 
                res.json({
                    token: token,
                    user: obj
                })
            }
        })
    }
})



export default router