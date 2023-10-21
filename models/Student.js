const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    stdID: String,
    name: String,
    year:String,
    email:String,
},{timestamps:true});

module.exports = mongoose.model('Student', studentSchema);