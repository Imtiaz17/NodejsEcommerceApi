const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
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
    parentId:{
        type:String
    },
    featured:{
        type:Number,
        default:0
    },
    //brands:[{type:mongoose.Schema.Types.ObjectId,ref:'Brand',required:true}],
    image:{type:String}
},{timestamps:true});

module.exports = mongoose.model('Category',categorySchema);