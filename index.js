const express = require('express')

const mongodb = require('mongoose')
require('dotenv').config();

const portfolio = require('./apis/portfolio')
const User = require('./apis/user')
// usageroute = require('./api/usage')
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
app.get('/',(req,res)=>{
    res.sendFile('./views/index.html',{root:__dirname})
})
app.listen(3000,()=>{
    console.log('server running !! ')
})

mongodb.set("strictQuery", false);
mongodb.connect(process.env.MONGO_URI, { useNewUrlParser: true })
const db = mongodb.connection
db.once('open', _ => {
  console.log('Database connected')
})
db.on('error', err => {
  console.error('connection error:', err)
})