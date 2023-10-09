
const mongo = require('mongoose')
var db = require('../database/connectdb');
var {randomId} = require('../tools/functions')
const crypto = require('crypto')
const emailSchema = new mongo.Schema({
    oldEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    newEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    tokenEmail:{
        type:String,
        default:crypto.randomBytes(30).toString('hex')
    }
  });
const User = mongo.Schema({
    userhash:{
        type:String,
        default:crypto.randomBytes(30).toString('hex')
    },
    email: {
        type:emailSchema,
        required: true
    },
    fullname: {
        type:String,
        required: true
    },
    phone:{
        type:String
    },
    birthdate:{
        type:String
    },
    password: {
        type: String,
        required:true
    },
    reset_id_bs: {
        type:String,
        required: true,
        length:50
    },
    reset_id_as: {
        type:String,
        length:50,
        default:null
    },
    confirm: {
        type:String, 
        length:3,
        default:"no"
    },
    code_confirm: {
        type:String,
        length:30,
    },
    id_pass:{
        type:String,
        length:10,
        default:""
    },
    alias:{
        type:String,
        unique:true
    },
    image_url:{
        type:String
    }
})

module.exports = mongo.model('Users',User,"Users")