
const mongo = require('mongoose')
var db = require('../database/connectdb');
var imageModel = require('./imageModel')
const portfolio = mongo.Schema({
    full_name: {
        type:String,
        default:""
    },
    street: {
        type:String,
        default:""
    },
    town: {
        type:String,
        default:""
    },
    post: {
        type:String,
        default:""
    },
    email: {
        type: String,
        default:""
    },
    phone: {
        type:String,
        default:""
    },
    image_url:{
        type:String
    },
    description: {
        type: String,
        default:""
    },
    experience: [{time:{type:String},entreprise:{type:String},description_post:{type:String},post:{type:String}}],
    education: [
        {diploma:{type:String},time:{type:String},university:{type:String},branch:{type:String}}
    ],
    skills:[{skill :{type:String}, percentage:{type:String}}],
    interest:{
        type:String,default:""
    },
    certif:[{name :{type:String}}],
    facebook:{
        type:String,default:""
    },
    linkedin:{
        type:String,default:""
    },
    github:{
        type:String,default:""
    },
    alias:{
        type:String,
        unique:true
    }

})

module.exports = mongo.model('portfolios',portfolio,"portfolios")