const express = require('express')
const emojis = require('../../Assets/emojis.json')
const router = express.Router()


router.get('/', (req, res)=>{
    res.json({data: emojis})
})


module.exports = router 