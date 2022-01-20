const express = require('express')
const cities = require('../../Assets/cities.json')
const router = express.Router()


router.get('/', (req, res)=>{
    res.json(cities)
})


module.exports = router 