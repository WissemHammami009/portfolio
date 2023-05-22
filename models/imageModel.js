const mongo = require('mongoose')
var db = require('../database/connectdb');
var {date,randomId} = require('../tools/functions')
const Image = mongo.Schema({
        name:{
            type:String
        },
        image:{
            type:Buffer
        },
        originalname:{
            type:String
        },
        type:{
            type:String
        },
        path:{
            type:String
        },
        size:{
            type:String
        },
        alias:{
            type:String
        },
        timeadded:{
            type:Date,
            default:date()
        }
})



module.exports = mongo.model('images',Image,"images")