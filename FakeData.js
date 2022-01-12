import express from 'express'
import connection from './middleware/db.js'
// import interests from './client/src/Assets/interests.js'

const router = express.Router()

// import fs from 'fs'
// const data = JSON.parse(fs.readFileSync('./mock_data/posts/MOCK_DATA.json', "utf8"))



router.get('/', async (req, res) => {
    // let sql = `INSERT IGNORE INTO user_interests (userID, interest) VALUES `
    // let arr = []
    // let arr2 = []

    // for(let i=0;i<100000;i++){
    //     let str = `(${Math.floor(Math.random() * (10033 - 32 + 1)) + 32}, "${interests[Math.floor(Math.random() * 448)]}"),`
    //     sql+=str
    // }
    
    // arr.push(Math.floor(Math.random() * (10033 - 32 + 1)) + 32)
    // let a1 = arr.filter(onlyUnique)
    // let a2 = arr2.filter(onlyUnique)

    // if(a1.length>a2.length){
    //     for(let i=0;i<a2.length;i++){
    //         let str = `(${a1[i]}, ${a2[i]}),`
    //         sql+=str
    //     }
    // } else {
    //     for(let i=0;i<a1.length;i++){
    //         let str = `(${a1[i]}, ${a2[i]}),`
    //         sql+=str
    //     } 

    // }
    // sql = sql.slice(0,-1)
    
    // await connection.promise().query(sql).then(()=>console.log('done'))

    res.send('done')

})

export default router

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
