//Student Name: Zhouxuan He
//Student Id: 301120369
//program: COMP229 sec.003
//Web App: Car Website

// Do not expose your credentials in your code.
let atlasDB = "mongodb+srv://HinsHo:comp229@car-midterm.akhcf.mongodb.net/?retryWrites=true&w=majority";

// Database setup
let mongoose = require('mongoose');

module.exports = function(){

    mongoose.connect(atlasDB);
    let mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection Error:'));
    mongodb.once('open', ()=>{
        console.log('===> Connected to MongoDB.');
    })

    return mongodb;
}