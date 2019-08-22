const express = require('express');
const router = express.Router();
const axios = require('axios');

//home page
router.get('/', (req, res)=> {
    res.send({
        message: 'Weather App'
    })
})

router.post('/', async (req,res) => {
    try{
        const apiKey = 'e23336fdd10cc4c1c6d5567aa3111b84';
        let city = req.body.cityname
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const response = await axios.get(url)
        const result = response.data
        res.send({
            cityname: result.name,
            citytemp: result.main.temp
        })
    }catch(err) {
        res.status(404).send({
            message: 'City Not found'
        })
    }
    
})
module.exports = router;