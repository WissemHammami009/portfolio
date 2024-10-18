const express = require('express')
require('dotenv').config();
jwt = require('jsonwebtoken')
const portfolio = require('./apis/portfolio')
const User = require('./apis/user')
const email = require('./apis/email')
const image = require('./apis/imageStorage')
const app = express()
var bodyParser = require('body-parser');
const isAuthenticate = require('./middlewares/Auth');

const path = require('path');
app.use(bodyParser.json());

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the 'views' directory to the 'views' folder
app.set('views', path.join(__dirname, 'views'));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use('/api/portfolio',portfolio)
app.use('/api/user',User)
app.use('/api/email',email)
app.use('/api/image',image)

app.get('/',(req,res)=>{
    res.sendFile('./views/index.html',{root:__dirname})
})
app.get('/testbackend',(req,res)=>{
    res.json({data:true})
})
app.listen(process.env.PORT,()=>{
    console.log(`Server Running on ${process.env.PORT}`)
})





