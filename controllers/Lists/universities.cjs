const express = require('express')
const universities = require('../../Assets/universities.json')
const router = express.Router()


router.get('/', (req, res)=>{
    res.json(universities)
})


module.exports = router 