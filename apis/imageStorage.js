const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
var router = express.Router();
var bodyParser = require('body-parser')
router.use(bodyParser.json());

// Define the image schema
const ImageModel = require('../models/imageModel')


// Define the upload middleware
const upload = multer({
  storage: multer.memoryStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const date = new Date();
      cb(null, `${date.getTime()}-${file.originalname}`);
    },
  }),
});

// Define the route for uploading images
router.post('/upload', upload.single('image'), async (req, res) => {
  // Create a new image model
  ImageModel.deleteOne({alias:req.body.alias}).then()
  const image = new ImageModel({
    originalname:req.file.originalname,
    image: req.file.buffer,
    type:req.file.mimetype,
    path:req.file.path,
    size:req.file.size,
    alias:req.body.alias
  });
  await image.save().then(response=>{
    res.json({code:200,response})
  }).catch(err=>{
      res.json({code:err.code})
  })
});

router.post('/getimage', upload.single('image'), async (req, res) => {
    // Create a new image model
    query = {alias:req.body.alias}
   // Get the image from the database
   const imageFromDb = await ImageModel.findOne(query).then()

   const base64Image = imageFromDb.image.toString('base64');
   res.status(200).json({data:base64Image,type:imageFromDb.type,filename:imageFromDb.originalname})
   //Send the image back as a response
   
  });
module.exports = router;