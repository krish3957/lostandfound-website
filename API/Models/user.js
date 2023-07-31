const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fname:{type:String,require:true},
    lname:{type:String,require:true},
    isAdmin: {
        type: Boolean,
        default: false
    },
    id:{type:String,require:true,unique:true},

},
    {timestamps:true}
);

module.exports = mongoose.model("User",UserSchema);