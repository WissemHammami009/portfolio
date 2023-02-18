
const mongo = require('mongoose')

const portfolio = mongo.Schema({
    full_name: {
        type:String,
        required: true
    },
    street: {
        type:String
    },
    town: {
        type:String
    },
    post: {
        type:String
    },
    email: {
        type: String,
    },
    phone: {
        type:String
    },
    description: {
        type: String
    },
    expreience: [{diploma:{type:String},time:{type:String},entreprise:{type:String},description_post:{type:String}}],
    education: [
        {diploma:{type:String},time:{type:String},university:{type:String},branch:{type:String}}
    ],
    skills:[{skill :{type:String}, percentage:{type:String}}],
    interest:{
        type:String
    },
    certif:[{name :{type:String}}],
    facebook:{
        type:String
    },
    linkedin:{
        type:String
    },
    github:{
        type:String
    }

})

module.exports = mongo.model('portfolios',portfolio,"portfolios")