const mongoose = require('mongoose');
const brandSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
    },
    // category:[{type:mongoose.Schema.Types.ObjectId,ref:'Category',required:true}],
    image:{type:String}
},{timestamps:true});

module.exports = mongoose.model('Brand',brandSchema);