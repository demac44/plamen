const express = require('express')
const interests = require('../../Assets/interests.json')
const router = express.Router()


router.get('/', (req, res)=>{
    res.json(interests)
})


module.exports = router 