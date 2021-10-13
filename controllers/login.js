import express from 'express'
import bcrypt from 'bcrypt'
import connection from '../middleware/db.js'

const router = express.Router()


router.post('/', async (req, res) => {
    const {username, password} = req.body
    let sql = `SELECT tag_name,pass FROM users WHERE tag_name="${username}" OR email="${username}"` 
    connection.query(sql, (err, result) => {
        if (result.length === 0) {
            res.send({error: 'User not found'})
        } else {
            let hashedPass = result[0].pass
            bcrypt.compare(password, hashedPass).then(response => {
                if (!response) {
                    res.send({error: 'Incorrect password!'})
                } else {
                    res.sendStatus(200)
                }
            })
        }
    })
})



export default router