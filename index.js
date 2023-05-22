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
const multer = require("multer");

const upload =  multer({
    // The directory where the files will be stored.
    destination: "uploads",
    // The list of file types that are allowed to be uploaded.
    limits: {
      fileSize: 1000 * 1024 * 1024, // 1 GB
    },
  })
app.use(bodyParser.json());


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
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

app.post("/upload",upload.single('file'), (req, res) => {
    // Get the file object from the request.
    const file = req.file;
  
    // Check if the file was uploaded successfully.
    if (!file) {
      res.send("File not uploaded.");
      return;
    }
  
    // Save the file to MongoDB.
    const image = {
      filename: file.originalname,
      data: file.buffer,
      type:file.mimetype
    };
  
    // Send a success response to the client.
    const base64Image = image.data.toString('base64');
    let html = `<img src="data:${image.type};base64,${base64Image}">`
    res.send(html)
  });



