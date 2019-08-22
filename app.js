const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const app = express();
const PORT = process.env.PORT || 3000;
const router = require('./routes/index');
app.use(express.urlencoded({extended: false}));
app.use(express.json()); 
//app.use(express.static(__dirname + '/Weatherapp_vue/dist')); //render vue components
app.use(cors())
app.use(morgan())
app.use('/', router);
app.listen(PORT, () => console.log(`The server started at port ${PORT}`));