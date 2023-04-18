const express = require('express')
require('dotenv').config();
jwt = require('jsonwebtoken')
const portfolio = require('./apis/portfolio')
const User = require('./apis/user')
const email = require('./apis/email')
const app = express()
var bodyParser = require('body-parser');
const isAuthenticate = require('./middlewares/Auth');



app.use(bodyParser.json());


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
app.get('/',(req,res)=>{
    res.sendFile('./views/index.html',{root:__dirname})
})
app.get('/testbackend',(req,res)=>{
    res.json({data:true})
})
app.listen(process.env.PORT,()=>{
    console.log(`Server Running on ${process.env.PORT}`)
})

app.post('/loginjwt',(req,res)=>{
    const {user,password} = req.body

    if (user=="wissem" && password == "mrpan") {
        tokken = jwt.sign({username:"wissem",password:"mrpan"},process.env.MAIN_KEY)
        res.status(200).json({token:tokken,message:"Login Granted"})
    }
    else{
        res.json({token:'Not Found',message:"Wrong credentials"})
    }
})
app.get('/getdata',isAuthenticate,(req,res)=>{
    res.send({json:"everything working"})
})