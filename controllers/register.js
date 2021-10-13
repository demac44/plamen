import express from 'express'
import bcrypt from 'bcrypt'
import connection from '../middleware/db.js'

const router = express.Router()


router.post('/', (req, res) => {
    let {username,password,fname,lname,email,birth_date,gender} = req.body
    let oldUser = `SELECT 
    (SELECT COUNT(email) 
    FROM users 
    WHERE email='${email}'
    ) AS countEmail,
    (SELECT COUNT(username) 
    FROM users 
    WHERE username='${username}'
    ) AS countUsername `
    connection.query(oldUser, (err, result)=>{
        if (result[0].countEmail > 0){
            res.send({error: 'Email already exists'})
        } else if (result[0].countUsername > 0){
            res.send({error: 'Username is already taken'})
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    let newUser =
                    `INSERT INTO users 
                    (userID, username, first_name, last_name, email, pass, gender, birth_date, date_registered, profile_picture)
                    VALUES 
                    (null, "${username}", "${fname}", "${lname}", "${email}", "${hash}","${gender}", STR_TO_DATE("${birth_date}", '%Y-%m-%d'), null, 'url')`
                    connection.query(newUser, (err, result) => {
                        if (err) console.log(err)
                        else  {
                            res.sendStatus(200)
                        }
                    })
                })
            })
        }
    })
})




export default router