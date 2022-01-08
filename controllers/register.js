import express from 'express'
import bcrypt from 'bcrypt'
import connection from '../middleware/db.js'
import nodemailer from 'nodemailer'

const router = express.Router()

const checkEmail = async (email) => {
    const sql = `SELECT EXISTS(SELECT 1 FROM users WHERE email="${email}" LIMIT 1) AS email;`
    const res = await connection.promise().query(sql).then(res=>{return res[0][0].email})
    if(res===1) return true
    return false
}
const checkUsername = async (username) => {
    const sql = `SELECT EXISTS(SELECT 1 FROM users WHERE username="${username}" LIMIT 1) AS username;`
    const res = await connection.promise().query(sql).then(res=>{return res[0][0].username})
    if(res===1) return true
    return false
}

const insertInfo = async (id, gender, bdate) => {
    const userInfo = `INSERT INTO user_info (userID, gender, bDate, date_joined)
                      VALUES (${id} ,"${gender}", STR_TO_DATE("${bdate}", '%Y-%m-%d'), null)`

   return await connection.promise().query(userInfo).then(()=>{return true}) 
}

const insertUser = async (username, fname, lname, email, hash) => {
    const newUser =`INSERT INTO users 
                    (username, first_name, last_name, email, pass)
                    VALUES 
                    ("${username}", "${fname}", "${lname}", "${email}", "${hash}")`
    return await connection.promise().query(newUser).then(res=>{return res})
}

const createCode = () => {
    let code = "";
    const chars = "abdcefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    for(let i=0;i<8;i++){
        let c = chars[Math.floor(Math.random() * 62)]
        code+=c
    }
    return code
}

const createHTML = (code) => {
    const html = `
    <body>
        <div style='width:100%;height:55px;padding:5px 10px;background-color:#1b1b1b;'>
            <img style='height:100%;' src='https://res.cloudinary.com/de5mm13ux/image/upload/v1641594878/Website%20assets/logo-full_gbltij.png'/>
        </div>
        <div style='width:100%;text-align:center;padding-top:15px;'>
            <h2>Confirm email</h2>
            <p>Enter this code on plamen app to verify your email: </p>
            <h1 style='width:100%;padding:30px 10px;'>${code}</h1>
            <p>If email is not verified within 7 days from registration, your plamen account will be removed!</p>
        </div>
        <div style='width:100%;padding:5px;background-color:#1b1b1b;text-align:center;'>
            <p style='color:white;'>&#169; Copyright plamen 2021. All rights reserved.</p>
        </div>
    </body>
    `

    return html
}

const sendCode = async (email) => {
    const code = createCode()

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
        subject: "Plamen - confirm email",
        text: "Enter this code on plamen app to verify your email: 812R91",
        html: createHTML(code)
    }).then(()=>{
        const sql = `INSERT INTO email_verification_codes (email, verification_code) VALUES ("${email}", "${code}")`
        connection.query(sql)
    })
}

router.post('/', async (req, res) => {
    const {username,password,fname,lname,email,birth_date,gender} = req.body

    if (await checkEmail(email)){
        res.send({error: 'Email already exists'})
    } else if (await checkUsername(username)){
        res.send({error: 'Username is already taken'})
    } else {
        bcrypt.genSalt(10, (_, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                await insertUser(username, fname, lname, email, hash).then(async response=>{
                    await insertInfo(response[0].insertId, gender, birth_date).then(()=>{
                        sendCode(email).then(()=>res.sendStatus(200))
                    })
                })
            })
        })
    }
})

export default router