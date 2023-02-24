var mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery',false);
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});
var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('Database connected');
});
conn.on('disconnected',function(){
    console.log('Database disconnected');
})
conn.on('error', console.error.bind(console, 'connection error:'));
module.exports = conn;