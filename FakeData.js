import express from 'express'
import connection from './middleware/db.js'
// import interests from './client/src/Assets/interests.js'

import axios from 'axios'


const router = express.Router()

// import fs from 'fs'
// const data = JSON.parse(fs.readFileSync('./mock_data/posts/MOCK_DATA.json', "utf8"))



router.get('/', async (req, res) => {
 res.send('asdasd')
})

export default router

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
