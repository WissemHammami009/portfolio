const express = require('express')
require('dotenv').config();

const portfolio = require('./apis/portfolio')
const User = require('./apis/user')
const email = require('./apis/email')
const app = express()
var bodyParser = require('body-parser');



app.use(bodyParser.json());


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/api/portfolio',portfolio)
app.use('/api/user',User)
app.use('/api/email',email)
app.get('/',(req,res)=>{
    res.sendFile('./views/index.html',{root:__dirname})
})
app.get('/testbackend',(req,res)=>{
    res.json({data:true})
})
app.listen(process.env.PORT,()=>{
    console.log(`Server Running on ${process.env.PORT}`)
})
