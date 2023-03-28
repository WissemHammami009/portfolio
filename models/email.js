const mongo = require('mongoose')
var db = require('../database/connectdb');
var {date} = require('../tools/functions')
const Email = mongo.Schema({
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
        toalias:{
            type:String
        }
})



module.exports = mongo.model('Emails',Email,"emails")