const mongoose = require('mongoose');



const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
},{
    timestamps:true
})



const USER = mongoose.model("user", UserSchema);

module.exports = USER;