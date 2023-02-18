
const mongo = require('mongoose')

const User = mongo.Schema({
    email: {
        type: String,
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
    }
})

module.exports = mongo.model('Users',User,"Users")