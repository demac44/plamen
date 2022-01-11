import express from 'express'
import connection from './middleware/db.js'

const router = express.Router()

import fs from 'fs'
// const data = JSON.parse(fs.readFileSync('./mock_data/posts/MOCK_DATA.json', "utf8"))


router.get('/', async (req, res) => {
    
    // let sql = `INSERT INTO posts (userID, post_text, url) VALUES `


    // for(let i=0;i<2000;i++){
    //     let str = ''
    //     if(i%2===0) str = `(${Math.floor(Math.random() * (10033 - 32 + 1)) + 32}, "${data[Math.floor(Math.random()*5000)].text}", null),`
    //     else str = `(${Math.floor(Math.random() * (10033 - 32 + 1)) + 32}, "${data[Math.floor(Math.random()*5000)].text}", "https://source.unsplash.com/random/sig=${i}"),`
    //     sql +=str
    // }
    // connection.query(sql.slice(0,-1))

    res.send('asasd')
})

export default router


