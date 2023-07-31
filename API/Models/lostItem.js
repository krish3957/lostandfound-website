const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    item:{type:String,required:true},
    desc:{type:String,required:true},
    image:{type:String,required:true},
    foundBy:{type:String,required:true},
    emailOfFinder:{type:String,required:true},
    block:{type:String,required:true},
    venue:{type:String},
    found:{type:Boolean,default:false},
    returnedTo:{type:String},
    category:{type:String},
    emailOfReturned:{type:String}
    },
    {timestamps:true}
);

module.exports = mongoose.model("item",itemSchema);