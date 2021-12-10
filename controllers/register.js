import express from 'express'
import bcrypt from 'bcrypt'
import connection from '../middleware/db.js'

const router = express.Router()

router.post('/', async (req, res) => {
    const {username,password,fname,lname,email,birth_date,gender} = req.body
    const oldUser = `SELECT 
    (SELECT COUNT(email) 
    FROM users 
    WHERE email='${email}'
    ) AS countEmail,
    (SELECT COUNT(username) 
    FROM users 
    WHERE username='${username}'
    ) AS countUsername `
    const result = await connection.promise().query(oldUser).then(res=>{return res[0]})
    if (result[0].countEmail > 0){
        res.send({error: 'Email already exists'})
    } else if (result[0].countUsername > 0){
        res.send({error: 'Username is already taken'})
    } else {
        bcrypt.genSalt(10, (_, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                const newUser =
                `INSERT INTO users 
                (userID, username, first_name, last_name, email, pass, profile_picture)
                VALUES 
                (null, "${username}", "${fname}", "${lname}", "${email}", "${hash}", null)`
                await connection.promise().query(newUser).then(async response=>{
                    const userInfo = `INSERT INTO user_info (userID, gender, bDate, date_joined)
                                      VALUES (${response[0].insertId} ,"${gender}", STR_TO_DATE("${birth_date}", '%Y-%m-%d'), null)`
                    await connection.promise().query(userInfo).then(()=>{res.sendStatus(200)})           
                })
            })
        })
    }
})

export default router