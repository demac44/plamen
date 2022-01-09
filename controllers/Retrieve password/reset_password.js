import express from 'express'
import bcrypt from 'bcrypt'
import connection from '../../middleware/db.js'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

const router = express.Router()


router.post('/', async (req, res) => {
    const {email} = req.body
    let sql = `SELECT email FROM users WHERE email="${email}"` 
    let result = await connection.promise().query(sql).then(res=>{return res[0][0]})
    if (!result?.email) {
        res.send({error: 'User with this email does not exist!'})
    } else {
        const token = jwt.sign({email: result.email}, process.env.JWT_SECRET)
        const insertToken = `INSERT INTO password_retrival_tokens (email, token) VALUES ("${email}", "${token}")`
        await connection.promise().query(insertToken).then(()=>{
            sendCode(result.email, token).then(()=>res.sendStatus(200))
        })
    }
})

router.post('/verify_token', async (req, res) => {
    const {token} = req.body
    let sql = `SELECT * FROM password_retrival_tokens WHERE token="${token}" AND time_sent > DATE_SUB( NOW(), INTERVAL 15 MINUTE ) LIMIT 1;` 
    let result = await connection.promise().query(sql).then(res=>{return res[0][0]})
    if (!result?.token) {
        res.send({error: true})
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, response)=>{
            if(err) {res.send({error: true}); return}
            else {
                if(response.email===result?.email){
                    return res.send({
                        error: false,
                        email: response.email
                    })
                } else {
                    return res.send({error: true})
                }
            }
        })
    }
})

const updatePassword = async (password, email) => {
    const sql = `UPDATE users SET pass="${password}" WHERE email="${email}"`
    return await connection.promise().query(sql).then(()=>{return true})
}

router.post('/set_password', async (req, res) => {
    const {email, password} = req.body
    if(!email){
        return res.send({error: true})
    } else {
        bcrypt.genSalt(10, (_, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                await updatePassword(hash, email).then(()=>{
                    const clear = `DELETE FROM password_retrival_tokens WHERE email="${email}"`
                    connection.query(clear)
                    res.send({error: false})
                })
            })
        })
    }
})

const createHTML = (token) => {
    const html = `
    <body>
        <div style='width:100%;height:55px;padding:5px 10px;background-color:#1b1b1b;'>
            <img style='height:100%;' src='https://res.cloudinary.com/de5mm13ux/image/upload/v1641594878/Website%20assets/logo-full_gbltij.png'/>
        </div>
        <div style='width:100%;text-align:center;padding-top:15px;'>
            <h2 style='color:black;'>Reset password</h2>
            <p style='color:black;'>Follow this link to reset your password:</p>
            <a style='padding:10px 30px;font-size:16px;color:black;background-color:white;border:1px solid #1b1b1b;border-radius:5px;margin-top:25px;' 
                href='http://localhost:3000/reset_password/${token}' target='_blank'>Reset password</a>
            <p style='color:black;margin-top:10px;'>This link is active for 15 minutes.</p>
            <p style='color:black;margin-top:15px;'>If this wasn't you trying to reset your password, please report it by following this <a href='href=http://localhost:3000/freset_password/${token}'>link</a>.</p>
        </div>
        <div style='width:100%;padding:5px;background-color:#1b1b1b;text-align:center;'>
            <p style='color:white;'>&#169; Copyright plamen 2021. All rights reserved.</p>
        </div>
    </body>
    `

    return html
}

const sendCode = async (email, token) => {
    let transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth:{
            user: "plamen.manage@gmail.com",
            pass:"Windowjesubak2000"
        }
    })

    await transporter.sendMail({
        from: "plamen.manage@gmail.com",
        to:email,
        subject: "Plamen - password reset",
        text: "Reset your plamen password!",
        html: createHTML(token)
    })
}


export default router