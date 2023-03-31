const mongo = require('mongoose')
var db = require('../database/connectdb');
var {date,randomId} = require('../tools/functions')
const Email = mongo.Schema({
        id:{
            type:String,
            default:randomId()
        },
        sender:{
            type:String
        },
        email:{
            type:String
        },
        subject:{
            type:String
        },
        message:{
            type:String
        },
        time:{
            type:String,
            default:date()
        },
        hashuser:{
            type:String
        }
})



module.exports = mongo.model('Emails',Email,"emails")